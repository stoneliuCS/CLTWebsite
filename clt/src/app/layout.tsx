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
  const res = await fetch(`${process.env.BASE_URL}/api/events`, {
    method: "GET",
    headers: {
      "events-api-key": process.env.GET_EVENTS_API_KEY!
    }
  })
  if (!res.ok) {
    throw new Error("Problem with fetching events")
  }
  const eventsData = await res.json()
  const events = eventsData.data
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout events={events} session={session}>{children}</ClientLayout>
      </body>
    </html>
  )
}
