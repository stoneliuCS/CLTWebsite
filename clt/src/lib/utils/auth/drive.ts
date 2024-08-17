import { drive_v3, google } from "googleapis"

export async function getGoogleDrive(client: any) {
  const drive = google.drive({
    version: "v3",
    auth: client,
  })
  return drive
}

export default async function checkDrivePermission(drive: drive_v3.Drive) {
  const cltId = process.env.NEXT_PUBLIC_CLT_DRIVE_ID
  if (!cltId)
    throw new Error(
      "Please initialize the CLT Google Drive ID as environment variable."
    )
  try {
    const hasFolder = await checkCLTFolder(drive)
    if (!hasFolder) return false
    const response = await drive.permissions.list({
      fileId: cltId,
    })
    return response.data.permissions?.length! > 0
  } catch (error: any) {
    console.error("Error retrieving permissions:", error)
    return false
  }
}

async function checkCLTFolder(drive: drive_v3.Drive) {
  const cltId = process.env.NEXT_PUBLIC_CLT_DRIVE_ID
  if (!cltId)
    throw new Error(
      "Please initialize the CLT Google Drive ID as environment variable."
    )
  try {
    const response = await drive.files.get({
      fileId: cltId,
      fields: "id, name",
    })
    if (response.data && response.data.id) {
      return true
    } else {
      return false
    }
  } catch (error: any) {
    if (error.response?.status === 404) {
      return false
    }
    throw error
  }
}
