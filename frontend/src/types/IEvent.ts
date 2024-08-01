import { ReactNode } from "react"

export default interface IEvent {
  eventName: string
  eventDescription: string
  eventImage: ReactNode
  eventDate: Date
}
