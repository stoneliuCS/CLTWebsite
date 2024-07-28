import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NextUIProvider } from "@nextui-org/react"
import NavBar from "@/components/layout/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chinese Language Table",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <NavBar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
