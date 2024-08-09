"use client"
import { Card, CardBody } from "@nextui-org/react"
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()
  if (!session) return <div> Please Login to view content. </div>
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <Card className="w-6/12 bg-blue-200"><CardBody> <p>Stone</p></CardBody></Card>
    </div>
  )
}
