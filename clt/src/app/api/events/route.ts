import { connectDB, closeDB } from "@/lib/db/db"
import EventModel from "@/lib/db/models/event"
import { auth } from "@/lib/utils/auth/auth"
import { base64ToFile } from "@/lib/utils/file"
import { uploadS3 } from "@/lib/utils/s3"
import { EventSchema } from "@/types/IEvent"

/**
 * Creates a Single Event
 * @param req
 * @returns
 */
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
  } else {
    Object.defineProperty(event, "eventImage", {
      value: { src : "/clt_logo.svg", alt: "Default CLT Placeholder Image"},
      enumerable : true
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

/**
 * Gets all events
 * @param req
 */
export async function GET(req: Request) {
  //Protect this api route
  const key = req.headers.get("events-api-key")
  if (key !== process.env.GET_EVENTS_API_KEY!)
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  try {
    await connectDB()
    const events = await EventModel.find()
    await closeDB()
    return new Response(
      JSON.stringify({ message: "Sucessfully got all Events", data: events }),
      { status: 200 }
    )
  } catch (e: any) {
    return new Response(
      JSON.stringify({ message: "Failed to get all events", error: e.message }),
      { status: 500 }
    )
  }
}
