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
