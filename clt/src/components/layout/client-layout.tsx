"use client"
import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react"
import NavBar from "@/components/layout/navbar"
import type { Session } from "next-auth"
import { EventsProvider } from "./EventsProvider"
import { IEvent } from "@/types/IEvent"

export default function ClientLayout({
  session,
  children,
  events,
}: {
  session: Session | null
  children: React.ReactNode
  events : IEvent[]
}) {
  return (
    <SessionProvider session={session}>
      <EventsProvider initialEvents={events}>
        <NextUIProvider>
          <NavBar />
          {children}
        </NextUIProvider>
      </EventsProvider>
    </SessionProvider>
  )
}
