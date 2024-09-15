import { connectDB, closeDB } from "@/lib/db/db"
import { auth } from "@/lib/utils/auth/auth"
import EventModel from "@/lib/db/models/event"
import { IEvent } from "@/types/IEvent"
import { deleteS3File, getS3ObjectKey, isS3BucketUrl, uploadS3 } from "@/lib/utils/s3"
import { base64ToFile } from "@/lib/utils/file"

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session)
    return Response.json({ message: "unauthorized" }, { status: 401 })
  try {
    const event = await req.json()

    if (event.eventImage.base64) {
      const f = event.eventImage
      const removePrefix64 = f.base64.split(",")[1]
      const file = base64ToFile(removePrefix64, f.fileName, f.fileType)
      const link = await uploadS3(file)
      Object.defineProperty(event, "eventImage", {
        value: { src: link, alt: f.fileName },
        enumerable: true,
      })
    }

    if (!event._id)
      return Response.json({ message: "No Event Id Found" }, { status: 400 })

    const id = event._id
    
    await connectDB()
    await EventModel.findByIdAndUpdate(id, event)
    return Response.json({ status: 200 })
  } catch (e) {
    return Response.json({ message: "Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session)
    return Response.json({ message: "unauthorized" }, { status: 401 })

  try {
    const event = await req.json()

    if (!event._id)
      return Response.json({ message: "No Event Id Found" }, { status: 400 })

    const id = event._id
    await connectDB()
    const fetchedEvent = await EventModel.findById(id) as IEvent
    if (!fetchedEvent) throw new Error("Cannot find event")
    const photoPath = fetchedEvent.eventImage?.src
    if (isS3BucketUrl(photoPath)) {
      const key = getS3ObjectKey(photoPath)
      if (!key) throw new Error("Not AWS Key")
      await deleteS3File(key)
    }
    await EventModel.findByIdAndDelete(id)
    return Response.json({ status: 200 })
  } catch (e) {
    return Response.json({ message: "Server Error" }, { status: 500 })
  }
}

