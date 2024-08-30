import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { auth } from "@/lib/utils/auth/auth"
import ClientLayout from "@/components/layout/client-layout"
import { IEvent } from "@/types/IEvent"
import { IAnnouncement } from "@/types/IAnnouncement"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chinese Language Table",
}

async function fetchEvents(baseUrl: string) {
  const apiKey = process.env.GET_EVENTS_API_KEY
  if (!apiKey) throw new Error("No Event API Key found")
  const res = await fetch(`${baseUrl}/api/events`, {
    method: "GET",
    headers: {
      "events-api-key": apiKey
    }
  })
  if (res.ok) {
    const json = await res.json()
    const events = json.data 
    return events as IEvent[]
  }
  throw new Error("Error trying to fetch events")
}

async function fetchAnnouncements(baseUrl : string) {
  const apiKey = process.env.GET_ANNOUNCEMENTS_API_KEY
  if (!apiKey) throw new Error("No Announcements API Key found")
    const res = await fetch(`${baseUrl}/api/announcements`, {
      method: "GET",
      headers: {
        "announcements-api-key": apiKey
      }
    })
    if (res.ok) {
      const json = await res.json()
      const announcements = json.data 
      return announcements as IAnnouncement[]
    }
    throw new Error("Error trying to fetch announcements")
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const baseUrl = process.env.BASE_URL 
  if (!baseUrl) throw new Error("No Base Url Found")
  const events = await fetchEvents(baseUrl)
  const announcements = await fetchAnnouncements(baseUrl)
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout announcements={announcements} events={events} session={session}>{children}</ClientLayout>
      </body>
    </html>
  )
}
