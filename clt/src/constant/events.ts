import { IEvent } from "@/types/IEvent"
import { TimelineItem } from "react-chrono"
import { Time } from "@internationalized/date"

export const events: IEvent[] = [
  {
    eventName: "CLT Beach Day At Revere Beach!",
    eventDate: { date: new Date(), startTime: new Time(), endTime : new Time() },
    eventDescription: "Fun day at Revere Beach",
    eventLocation: "Revere Beach",
    eventImage: {
      src: "/images/beach_day.jpg",
      alt: "Beach Day",
      priority: true,
    },
  },
  {
    eventName: "Calligraphy Night!",
    eventDate: { date: new Date(), startTime: new Time(), endTime : new Time() },
    eventDescription: "Calligraphy Night Description",
    eventLocation: "Curry 424",
    eventImage: {
      src: "/images/calligraphy_night.jpg",
      alt: "Calligraphy Night",
    },
  },
  {
    eventName: "Ice Skating Outing",
    eventDate: { date: new Date(), startTime: new Time(), endTime : new Time() },
    eventDescription: "Ice Skating Outing",
    eventLocation: "North End",
    eventImage: {
      src: "/images/ice_skating.jpg",
      alt: "Chinese Language Table Logo",
    },
  },
]

export const eventTimeLineItems: TimelineItem[] = events.map((event) => {
  return {
    cardTitle: event.eventName,
    date: event.eventDate.date,
    cardDetailedText: event.eventDescription,
  }
})
