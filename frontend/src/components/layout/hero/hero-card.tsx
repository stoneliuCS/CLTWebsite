import { Card, CardFooter } from "@nextui-org/react"
import { ReactNode } from "react"

interface Props {
  title: string
  description: string
  date: Date
  image: ReactNode
}

export default function HeroCard(props: Props) {
  return (
    <Card
      className="h-[60vh] w-[35vw] bg-gradient-to-r from-cyan-300 to-blue-200 "
      shadow="lg"
      isHoverable={true}
    >
      <div className="relative h-full w-full">{props.image}</div>

      <CardFooter className="flex justify-center">
        <small className="text-default-500">
          <strong>{props.title}</strong>, {props.date.toDateString()}
        </small>
      </CardFooter>
    </Card>
  )
}
