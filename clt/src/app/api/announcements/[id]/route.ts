import { connectDB, closeDB } from "@/lib/db/db"
import { auth } from "@/lib/utils/auth/auth"
import AnnouncementModel from "@/lib/db/models/Announcement"

export async function PATCH(req: Request) {
    const session = await auth()
    if (!session)
        return Response.json({ message: "unauthorized" }, { status: 401 })
    try {
        const announcement = await req.json()

        if (!announcement._id)
            return Response.json({ message: "No Announcement Id Found" }, { status: 400 })

        const id = announcement._id

        await connectDB()
        await AnnouncementModel.findByIdAndUpdate(id, announcement)
        await closeDB()
        return Response.json({ status: 200 })
    } catch (e) {
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
        await AnnouncementModel.findByIdAndDelete(id)
        await closeDB()
        return Response.json({ status: 200 })
    } catch (e) {
        return Response.json({ message: "Server Error" }, { status: 500 })
    }
}