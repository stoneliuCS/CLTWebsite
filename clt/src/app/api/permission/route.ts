import checkCLTDrivePermission from "@/lib/utils/drive"
import { auth } from "@/lib/utils/auth"

/**
 * Check if the current session has access to the Shared CLT Google Drive
 */
export async function GET() {
  const session = await auth()
  if (!session)
    return Response.json(
      {
        message: "You are not signed in.",
      },
      { status: 401 }
    )
  const permission = await checkCLTDrivePermission()
  if (!permission)
    return Response.json(
      { message: "You do not have access to the Shared CLT Google Drive" },
      { status: 401 }
    )
  return Response.json(
    { message: "Success! Welcome to the CLT Dashboard" },
    { status: 200 }
  )
}
