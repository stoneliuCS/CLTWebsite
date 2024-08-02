export default interface IEvent {
  eventName: string
  eventDescription: string
  eventImage: IEventImage
  eventDate: Date
}

interface IEventImage {
  src : string 
  alt : string 
  priority? : boolean
}
