"use client"
import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react"
import NavBar from "@/components/layout/navbar"
import type { Session } from "next-auth"

export default function ClientLayout({
  session,
  children,
}: {
  session: Session | null
  children: React.ReactNode
}) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <NavBar />
        {children}
      </NextUIProvider>
    </SessionProvider>
  )
}
