import { connectDB } from "@/lib/db/db"
import { auth } from "@/lib/utils/auth/auth"
import AnnouncementModel from "@/lib/db/models/Announcement"
import { IAnnouncement } from "@/types/IAnnouncement"
import { deleteS3File, getS3ObjectKey, isS3BucketUrl, uploadS3 } from "@/lib/utils/s3"
import { base64ToFile } from "@/lib/utils/file"

export async function PATCH(req: Request) {
    const session = await auth()
    if (!session)
        return Response.json({ message: "unauthorized" }, { status: 401 })
    try {
        const announcement = await req.json()

        if (announcement.announcementPhoto.base64) {
            const f = announcement.announcementPhoto
            const removePrefix64 = f.base64.split(",")[1]
            const file = base64ToFile(removePrefix64, f.fileName, f.fileType)
            const link = await uploadS3(file)
            Object.defineProperty(announcement, "announcementPhoto", {
              value: { src: link, alt: f.fileName },
              enumerable: true,
            })
          }

        if (!announcement._id)
            return Response.json({ message: "No Announcement Id Found" }, { status: 400 })

        const id = announcement._id

        await connectDB()
        await AnnouncementModel.findByIdAndUpdate(id, announcement)
        return Response.json({ status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ message: "Server Error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const session = await auth()
    if (!session)
        return Response.json({ message: "unauthorized" }, { status: 401 })
    try {
        const announcement = await req.json()

        if (!announcement._id)
            return Response.json({ message: "No Announcement Id Found" }, { status: 400 })

        const id = announcement._id

        await connectDB()
        const fetchedAnnouncement = await AnnouncementModel.findById(id) as IAnnouncement
        if (!fetchedAnnouncement) throw new Error("Could not find Announcement")
        const photoPath = fetchedAnnouncement.announcementPhoto.src
        if (isS3BucketUrl(photoPath)) {
            const key = getS3ObjectKey(photoPath)
            if (!key) throw new Error("Not AWS Key")
            await deleteS3File(key)
        }
        await AnnouncementModel.findByIdAndDelete(id)
        return Response.json({ status: 200 })
    } catch (e) {
        return Response.json({ message: "Server Error" }, { status: 500 })
    }
}