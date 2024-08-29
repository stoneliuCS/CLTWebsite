import { IAnnouncement } from "@/types/IAnnouncement";
import { createContext, useContext, useState } from "react";

interface AnnouncementContext {
    announcements: IAnnouncement[]
    setAnnouncements: React.Dispatch<React.SetStateAction<IAnnouncement[]>>
}

const defaultContextValue: AnnouncementContext = {
    announcements: [],
    setAnnouncements: () => { }
}

const AnnouncementContext = createContext<AnnouncementContext>(defaultContextValue)

export const AnnouncementsProvider: React.FC<{
    children: React.ReactNode
    initalAnnouncements: IAnnouncement[]
}> = ({ children, initalAnnouncements }) => {
    const [announcements, setAnnouncements] = useState(initalAnnouncements)
    return (
        <AnnouncementContext.Provider value={{ announcements, setAnnouncements }}>
            {children}
        </AnnouncementContext.Provider>
    )
}

export const useAnnouncements = () => {
    const context = useContext(AnnouncementContext);
    if (!context) {
        throw new Error("useAnnouncements must be used within the AnnouncementConctext");
    }
    return context;
}