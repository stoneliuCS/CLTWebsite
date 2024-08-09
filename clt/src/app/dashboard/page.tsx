'use client'
import { useSession } from "next-auth/react"

export default function Dashboard() {
    const { data: session, status } = useSession()
    if (status === "unauthenticated") return <div> You Are Not Authenticated. </div>
    if (!session) return <div> Please Login to view content. </div>
    return <div> Stone </div>
}