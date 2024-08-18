import { connectDB, closeDB } from "@/lib/db/db"
import EventModel from "@/lib/db/models/event"
import { auth } from "@/lib/utils/auth/auth"
import { base64ToFile } from "@/lib/utils/file"
import { uploadS3 } from "@/lib/utils/s3"
import { EventSchema } from "@/types/IEvent"

export async function POST(req: Request) {
  const session = await auth()

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const zEvent = EventSchema.safeParse(body)
  if (!zEvent.success) {
    const error = zEvent.error.format()
    return Response.json({ error: error }, { status: 400 })
  }
  const event = zEvent.data
  //Probably a better way to do this but we can replace our eventImage with a public url
  if (event.eventImage) {
    const f = event.eventImage
    const removePrefix64 = f.base64.split(",")[1]
    const file = base64ToFile(removePrefix64, f.fileName, f.fileType)
    const link = await uploadS3(file)
    Object.defineProperty(event, "eventImage", {
      value: { src: link, alt: f.fileName },
      enumerable: true,
    })
  }
  try {
    await connectDB()
    await EventModel.create(event)
    await closeDB()
    return new Response(
      JSON.stringify({ message: "Event created successfully" }),
      { status: 201 }
    )
  } catch (e: any) {
    console.error(e)
    return new Response(
      JSON.stringify({ message: "Failed to create event", error: e.message }),
      { status: 500 }
    )
  }
}
