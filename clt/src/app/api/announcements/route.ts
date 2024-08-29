import { closeDB, connectDB } from "@/lib/db/db"
import AnnouncementModel from "@/lib/db/models/Announcement"
import { auth } from "@/lib/utils/auth/auth"
import { base64ToFile } from "@/lib/utils/file"
import { uploadS3 } from "@/lib/utils/s3"
import { AnnouncementSchema } from "@/types/IAnnouncement"

export async function POST(req: Request) {
  const session = await auth()
  if (!session)
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const zAnnouncement = AnnouncementSchema.safeParse(body)
  if (!zAnnouncement.success) {
    const error = zAnnouncement.error.format()
    return Response.json({ error: error }, { status: 400 })
  }
  const announcement = zAnnouncement.data
  //If there is an announcementPhoto attached to this:
  if (announcement.announcementPhoto) {
    const f = announcement.announcementPhoto
    const removePrefix64 = f.base64.split(",")[1]
    const file = base64ToFile(removePrefix64, f.fileName, f.fileType)
    const link = await uploadS3(file)
    Object.defineProperty(announcement, "announcementPhoto", {
      value: { src: link, alt: f.fileName },
      enumerable: true,
    })
  } else {
    //Include a stock CLT Image as the photo
  } 
  try {
    await connectDB()
    await AnnouncementModel.create(announcement)
    await closeDB()
    return new Response(
      JSON.stringify({ message: "Announcement created successfully" }),
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
