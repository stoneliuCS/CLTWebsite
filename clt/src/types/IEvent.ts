import { Time } from "@internationalized/date"
import { z } from "zod"

export interface IEvent {
  eventName: string
  eventDate: Date
  startTime: Time
  endTime: Time
  eventLocation: string
  eventDescription: string
  contactName?: string
  phoneNumber?: string
  emailAddress?: string
  eventImage?: { src: string; alt: string }
  eventLinks?: string[]
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
    z.null().optional()
  ]),
})
