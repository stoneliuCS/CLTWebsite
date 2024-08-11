import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { ReactNode } from "react"

interface IDashboardCardProps {
  className?: string
  title?: string
  content?: ReactNode
}

export default function DashboardCard({
  className = "",
  content = "No Content Available",
  title,
}: IDashboardCardProps) {
  return (
    <Card className={className}>
      {title && (
        <div>
          <CardHeader className="flex justify-center">
            <p
              className={`text-lg lg:text-xl text-center text-slate-600 font-semibold	drop-shadow-lg`}
            >
              {title}
            </p>
          </CardHeader>
          <Divider />
        </div>
      )}
      <CardBody>{content}</CardBody>
    </Card>
  )
}
