"use client"
import DashboardCard from "@/components/card/dashboard-card"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { MdEventAvailable } from "react-icons/md"

export default function Dashboard() {
  const { data: session } = useSession()
  if (!session) return <div> Please Login to view content. </div>
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-11/12 h-[90%] bg-blue-200">
        <CardBody>
          <div className="flex flex-col h-full">
            <Tabs
              aria-label="options"
              size="lg"
              color="primary"
              variant="underlined"
              className="flex justify-center"
            >
              <Tab
                key="events"
                title={
                  <div className="flex items-center space-x-2">
                    <MdEventAvailable />
                    <span>Events Dashboard</span>
                  </div>
                }
                className="h-full"
              >
                <DashboardCard className="h-full" content={
                  <div className="w-full h-full">

                  </div>
                } />
              </Tab>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
