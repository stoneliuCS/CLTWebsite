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

  console.log(event)

  return Response.json({ message: "Success" }, { status: 200 })
}
