import { Time } from "@internationalized/date"

export interface IEvent {
  eventName: string
  eventDate: IEventDate
  eventLocation: string
  eventDescription?: string
  eventContact?: IEventContact
  eventImage?: IEventImage
  eventAttachments?: IEventAttachment[]
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

interface IEventAttachment {
  type: "registration" | "engage"
  label: string
}
