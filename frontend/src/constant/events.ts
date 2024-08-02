import IEvent from "@/types/IEvent"

const events: IEvent[] = [
  {
    eventName: "CLT Beach Day At Revere Beach!",
    eventDate: new Date(),
    eventDescription: "Fun day at Revere Beach",
    eventImage: {
      src: "/beach_day.jpg",
      alt: "Beach Day",
      priority: true,
    },
  },
  {
    eventName: "Calligraphy Night!",
    eventDate: new Date(),
    eventDescription: "Calligraphy Night Description",
    eventImage: {
      src: "/calligraphy_night.jpg",
      alt: "Calligraphy Night",
    },
  },
  {
    eventName: "Ice Skating Outing",
    eventDate: new Date(),
    eventDescription: "Ice Skating Outing",
    eventImage: {
      src: "/ice_skating.jpg",
      alt: "Chinese Language Table Logo",
    },
  },
]

export default events
