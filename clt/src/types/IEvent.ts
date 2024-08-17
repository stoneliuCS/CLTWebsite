import { Time } from "@internationalized/date"
import { z } from "zod"

export interface IEvent {
  eventName: string
  eventDate: IEventDate
  eventLocation: string
  eventDescription: string
  eventContact?: IEventContact
  eventImage?: IEventImage
  eventLinks?: string[]
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

export const EventSchema = z.object({
  eventName : z.string(),
  eventDate : z.string().date(),
  startTime : z.string().time(),
  endTime : z.string().time(),
  eventLocation : z.string(),
  eventDescription: z.string(),
  contactName : z.string().optional(),
  phoneNumber : z.string().optional(),
  emailAddress : z.string().optional(),
  eventLinks : z.array(z.string()).optional()
})

