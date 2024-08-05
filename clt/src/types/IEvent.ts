export interface IEvent {
  eventName: string
  eventDescription: IEventDescription
  eventImage: IEventImage
  eventDate: Date
  eventAttachments? : IEventAttachment[]
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
  address : string
}

interface IEventContact {
  contactName : string
  phoneNumber : string
  emailAddress : string
}

interface IEventAttachment {
  type : 'registration' | 'engage'
}