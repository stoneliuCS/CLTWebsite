import { Time } from "@internationalized/date"
import { z } from "zod"

export interface IEvent {
  eventName: string
  eventDate: IEventDate
  eventLocation: string
  eventDescription: string
  eventContact?: IEventContact
  eventImage?: IEventImage
  eventLinks?: IEventLink[]
}

interface IEventDate {
  date: Date
  startTime: Time
  endTime: Time
}

interface IEventImage {
  src: string
  alt: string
  priority?: boolean
}

interface IEventContact {
  contactName: string
  phoneNumber: string
  emailAddress: string
}

interface IEventLink {
  type: "registration" | "engage"
  url : string
}

export const EventSchema = z.object({
  eventName : z.string(),
  date : z.date(),
  startTime : z.string().time(),
  endTime : z.string().time(),
  eventLocation : z.string(),
  eventDescription: z.string(),
  contactName : z.string().optional(),
  phoneNumber : z.string().optional(),
  emailAddress : z.string().email(),
  src : z.string().optional(),
  alt : z.string().optional(),
  priority : z.boolean().optional(),
  //TODO Add EVENTLINK
})
