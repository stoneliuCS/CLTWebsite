export interface IAnnouncement {
  announcementName: string
  announcementDate: string
  announcementDescription: string
  announcementPhoto?: {
    src: string
    alt: string
  }
  announcementLinks? : string[]
}
