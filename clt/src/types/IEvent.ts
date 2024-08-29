import { z } from "zod"

export interface IEvent {
  _id : string
  eventName: string 
  eventDate: string //As a string representation of a date
  startTime: string //As a string representation of a time
  endTime: string //As a string representation of a time
  eventLocation: string
  eventDescription: string
  contactName?: string
  phoneNumber?: string
  emailAddress?: string
  eventImage?: { src: string; alt: string }
  eventLinks?: string[]
}

export interface TimeLineEvent {
  cardTitle: string,
  date: Date,
  cardDetailedText: string
}

export const EventSchema = z.object({
  eventName: z.string(),
  eventDate: z.string().date(),
  startTime: z.string().time(),
  endTime: z.string().time(),
  eventLocation: z.string(),
  eventDescription: z.string(),
  contactName: z.string().optional(),
  phoneNumber: z.string().optional(),
  emailAddress: z.string().optional(),
  eventLinks: z.array(z.string()).optional(),
  eventImage: z.union([
    z
      .object({
        fileType: z.string(),
        fileName: z.string(),
        base64: z.string(),
      })
      .optional(),
    z.string().optional()
  ]),
})
