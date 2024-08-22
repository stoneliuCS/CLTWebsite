import { auth } from "@/lib/utils/auth/auth"

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session)
    return Response.json({ message: "unauthorized" }, { status: 401 })
  try {
    const body = req.json()
    console.log(body)
  } catch (e) {
    console.log(e)
  }
}
