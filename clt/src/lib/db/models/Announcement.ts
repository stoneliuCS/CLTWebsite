import mongoose from "mongoose"

const AnnouncementSchema = new mongoose.Schema({
  announcementName: { type: String, required: true },
  announcementDate: { type: String, required: true },
  announcementDescription: { type: String, required: true },
  announcementPhoto: {
    src: { type: String },
    alt: { type: String },
  },
  announcementLinks: [{ type: String }]

})

const AnnouncementModel = mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema)

export default AnnouncementModel