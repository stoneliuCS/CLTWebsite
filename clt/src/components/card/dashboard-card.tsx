import { Card, CardBody } from "@nextui-org/react"
import { ReactNode } from "react"

interface IDashboardCardProps {
  className?: string
  content?: ReactNode
}

export default function DashboardCard({
  className = "",
  content = "No Content Available",
}: IDashboardCardProps) {
  return (
    <Card className={className}>
      <CardBody>{content}</CardBody>
    </Card>
  )
}
