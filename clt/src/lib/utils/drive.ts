import { google } from "googleapis"
import { auth } from "./auth"
import { getOAuthClient } from "./oauth-client"

async function getGoogleDrive() {
  const session = await auth()
  if (!session) return
  const oauthclient = await getOAuthClient(session)

  const drive = google.drive({
    version: "v3",
    auth: oauthclient,
  })
  return drive
}

export default async function checkCLTDrivePermission() {
  const cltId = process.env.NEXT_PUBLIC_CLT_DRIVE_ID
  if (!cltId)
    throw new Error(
      "Please initialize the CLT Google Drive ID as environment variable."
    )
  const drive = await getGoogleDrive()
  if (!drive) throw new Error("Error getting the Google Drive")
  try {
    const response = await drive.permissions.list({
      fileId: cltId,
    })
    return response.data.permissions?.length! > 0
  } catch (error: any) {
    console.error("Error retrieving permissions:", error)
    return false
  }
}
