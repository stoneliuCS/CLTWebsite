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
  if (announcement.announcementPhoto && typeof announcement.announcementPhoto !== 'string') {
    const f = announcement.announcementPhoto
    const removePrefix64 = f.base64.split(",")[1]
    const file = base64ToFile(removePrefix64, f.fileName, f.fileType)
    const link = await uploadS3(file)
    Object.defineProperty(announcement, "announcementPhoto", {
      value: { src: link, alt: f.fileName },
      enumerable: true,
    })
  } else {
    Object.defineProperty(announcement, "announcementPhoto", {
      value: { src: "/clt_logo.svg", alt: "Default CLT Placeholder Image" },
      enumerable: true
    })
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

export async function GET(req: Request) {
  const key = req.headers.get('announcements-api-key')
  if (key !== process.env.GET_ANNOUNCEMENTS_API_KEY) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }
  try {
    await connectDB()
    const announcements = await AnnouncementModel.find()
    await closeDB()
    return new Response(
      JSON.stringify({ message: "Sucessfully got all Events", data: announcements }),
      { status: 200 }
    )
  } catch (e: any) {
    console.log(e)
    return new Response(
      JSON.stringify({ message: "Failed to get all announcements", error: e.message }),
      { status: 500 }
    )
  }
}
