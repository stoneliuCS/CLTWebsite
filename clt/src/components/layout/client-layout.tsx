"use client"
import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react"
import NavBar from "@/components/layout/navbar"
import type { Session } from "next-auth"
import { EventsProvider } from "./EventsProvider"
import { IEvent } from "@/types/IEvent"
import { IAnnouncement } from "@/types/IAnnouncement"
import { AnnouncementsProvider } from "./AnnouncementProvider"

export default function ClientLayout({
  session,
  children,
  events,
  announcements
}: {
  session: Session | null
  children: React.ReactNode
  events: IEvent[]
  announcements: IAnnouncement[]
}) {
  return (
    <SessionProvider session={session}>
      <AnnouncementsProvider initalAnnouncements={announcements}>
        <EventsProvider initialEvents={events}>
          <NextUIProvider>
            <NavBar />
            {children}
          </NextUIProvider>
        </EventsProvider>
      </AnnouncementsProvider>
    </SessionProvider>
  )
}
