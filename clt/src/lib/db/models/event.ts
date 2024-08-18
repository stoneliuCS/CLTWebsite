import mongoose from "mongoose"

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventDescription: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  contactName: String,
  phoneNumber: String,
  emailAddress: String,
  eventImage: String,
  eventLinks: [{ type: String }],
})

const EventModel = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default EventModel
