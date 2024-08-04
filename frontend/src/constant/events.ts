import { IEvent } from "@/types/IEvent"
import { TimelineItem } from "react-chrono"

export const events: IEvent[] = [
  {
    eventName: "CLT Beach Day At Revere Beach!",
    eventDate: new Date(),
    eventDescription: {
      summary: "Fun day at Revere Beach",
      location: { street: "Revere Beach" },
    },
    eventImage: {
      src: "/beach_day.jpg",
      alt: "Beach Day",
      priority: true,
    },
  },
  {
    eventName: "Calligraphy Night!",
    eventDate: new Date(),
    eventDescription: { summary: "Calligraphy Night Description" },
    eventImage: {
      src: "/calligraphy_night.jpg",
      alt: "Calligraphy Night",
    },
  },
  {
    eventName: "Ice Skating Outing",
    eventDate: new Date(),
    eventDescription: { summary: "Ice Skating Outing" },
    eventImage: {
      src: "/ice_skating.jpg",
      alt: "Chinese Language Table Logo",
    },
  },
]

export const eventTimeLineItems: TimelineItem[] = events.map((event) => {
  return {
    cardTitle: event.eventName,
    date: event.eventDate,
    cardDetailedText : event.eventDescription.summary
  }
})
