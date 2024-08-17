import { connectDB, closeDB } from "@/lib/db/db"
import EventModel from "@/lib/db/models/event"
import { auth } from "@/lib/utils/auth/auth"
import { EventSchema } from "@/types/IEvent"

export async function POST(req: Request) {
  const session = await auth()

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const event = EventSchema.safeParse(body)

  if (!event.success) {
    const error = event.error.format()
    return Response.json({ error: error }, { status: 400 })
  }

  try {
    await connectDB()
    await EventModel.create(event.data)
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
