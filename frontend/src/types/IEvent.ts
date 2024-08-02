export default interface IEvent {
  eventName: string
  eventDescription: IEventDescription
  eventImage: IEventImage
  eventDate: Date
}

interface IEventImage {
  src : string 
  alt : string 
  priority? : boolean
}

interface IEventDescription {
  summary : string
  location? : IEventLocation
  contact? : IEventContact 
  other? : any
}

interface IEventLocation {
  street : string
}

interface IEventContact {
  contactName : string
  phoneNumber : string
  emailAddress : string
}