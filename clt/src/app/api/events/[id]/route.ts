import { connectDB, closeDB } from "@/lib/db/db"
import { auth } from "@/lib/utils/auth/auth"
import EventModel from "@/lib/db/models/event"
export async function PATCH(req: Request) {
  const session = await auth()
  if (!session)
    return Response.json({ message: "unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const id = body.eventId
    //initialize a connection to the database
    await connectDB()
    await EventModel.findByIdAndUpdate(id, {})
    await closeDB()
    return Response.json({ message: "Successful" }, { status: 200 })
  } catch (e) {
    return Response.json({ message: "Server Error" }, { status: 500 })
  }
}
