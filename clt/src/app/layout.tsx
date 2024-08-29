import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { auth } from "@/lib/utils/auth/auth"
import ClientLayout from "@/components/layout/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chinese Language Table",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const resEvents = await fetch(`${process.env.BASE_URL}/api/events`, {
    method: "GET",
    headers: {
      "events-api-key": process.env.GET_EVENTS_API_KEY!
    }
  })
  let events = []
  if (resEvents.ok) {
    const eventsData = await resEvents.json()
    events = eventsData.data
  }
  const resAnnouncements = await fetch(`${process.env.BASE_URL}/api/announcements`, {
    method : "GET",
    headers : {
      "announcements-api-key" : process.env.GET_ANNOUNCEMENTS_API_KEY!
    }
  })
  let announcements = []
  if (resAnnouncements.ok) {
    const announcementsData = await resAnnouncements.json()
    announcements = announcementsData.data
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout announcements={announcements} events={events} session={session}>{children}</ClientLayout>
      </body>
    </html>
  )
}
