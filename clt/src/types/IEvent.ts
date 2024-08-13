import { Time } from "@internationalized/date"

export interface IEvent {
  eventName: string
  eventDate: IEventDate
  eventLocation: string
  eventDescription?: string
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
