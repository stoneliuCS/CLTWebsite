import { z } from "zod"

export interface IAnnouncement {
  _id : string
  announcementName: string
  announcementDate: string
  announcementDescription: string
  announcementPhoto?: {
    src: string
    alt: string
  }
  announcementLinks? : string[]
}

export const AnnouncementSchema = z.object({
  announcementName : z.string(),
  announcementDate : z.date(),
  announcementDescription : z.date(),
  announcementPhoto: z.union([
    z
      .object({
        fileType: z.string(),
        fileName: z.string(),
        base64: z.string(),
      })
      .optional(),
    z.null().optional()
  ]),
  announcementLinks : z.array(z.string()).optional()
})
