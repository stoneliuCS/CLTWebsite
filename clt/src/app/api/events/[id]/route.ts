import { connectDB, closeDB } from "@/lib/db/db"
import { auth } from "@/lib/utils/auth/auth"
import EventModel from "@/lib/db/models/event"

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session)
    return Response.json({ message: "unauthorized" }, { status: 401 })
  try {
    const event = await req.json()

    if (!event.eventId)
      return Response.json({ message: "No Event Id Found" }, { status: 400 })

    const id = event.eventId

    for (const val of Object.keys(event)) {
      if (!event[val]) {
        delete event[val]
      } else if (Array.isArray(event[val]) && event[val].length === 0) {
        delete event[val]
      }
    }

    delete event["eventId"]

    if (!(Object.keys(event).length > 0)) {
      return Response.json({ message: "No change detected." }, { status: 400 })
    }

    //initialize a connection to the database
    await connectDB()
    await EventModel.findByIdAndUpdate(id, event)
    await closeDB()
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

    if (!event.eventId)
      return Response.json({ message: "No Event Id Found" }, { status: 400 })

    const id = event.eventId
    await connectDB()
    await EventModel.findByIdAndDelete(id)
    await closeDB()
    return Response.json({ status: 200 })
  } catch (e) {
    return Response.json({ message: "Server Error" }, { status: 500 })
  }
}
