import { IEvent } from "@/types/IEvent"
import { createContext, useContext, useState } from "react"

interface EventsContext {
  events: IEvent[]
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>
}

const defaultContextValue: EventsContext = {
  events: [],
  setEvents: () => { }
};

const EventsContext = createContext<EventsContext>(defaultContextValue)

export const EventsProvider: React.FC<{
  children: React.ReactNode
  initialEvents: IEvent[]
}> = ({ children, initialEvents }) => {
  const [events, setEvents] = useState<IEvent[]>(initialEvents)
  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  )
}

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
