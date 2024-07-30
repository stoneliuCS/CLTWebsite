import { Card, Tooltip } from "@nextui-org/react"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  title: string
  description: string
  date: Date
  image: ReactNode
}

export default function PictureCard(props: Props) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Tooltip
        offset={-30}
        size="lg"
        placement="bottom"
        color="primary"
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold">{props.title}</div>
            <div className="text-tiny">{props.date.toDateString()}</div>
          </div>
        }
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeIn",
              },
            },
            enter: {
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            },
          },
        }}
      >
        <Card
          className="bg-gradient-to-r from-cyan-300 to-blue-200 h-[70vh] w-full "
          shadow="lg"
          isHoverable={true}
        >
          <div className="relative h-full w-full">{props.image}</div>
        </Card>
      </Tooltip>
    </motion.div>
  )
}
