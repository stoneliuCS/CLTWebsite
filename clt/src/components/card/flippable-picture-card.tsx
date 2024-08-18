import { IEvent } from "@/types/IEvent"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { motion } from "framer-motion"
import { withClick } from "./flip-card"
import NextImage from "next/image"

type ShadowType = "none" | "sm" | "md" | "lg" | undefined

interface OverridePictureCardProp {
  event: IEvent
  shadow: ShadowType
  variant?: "Front" | "Back"
}

function OverridePictureCard({
  shadow = "none",
  variant,
  event,
}: OverridePictureCardProp) {
  return (
    <div className="h-[80vh]">
      {variant === "Front" && (
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Card className="h-full w-full" isBlurred shadow={shadow}>
            <div className="h-full w-full">
              <div className="relative w-full h-full">
                <NextImage
                  src={event.eventImage!.src}
                  alt={event.eventImage!.src}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-height : 80vh)"
                />
              </div>
            </div>
          </Card>
          <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
            <Card className="w-6/12" shadow="lg">
              <CardBody>
                <p className="text-center truncate">
                  <strong>{event.eventName}</strong>
                </p>
              </CardBody>
            </Card>
          </div>
        </motion.div>
      )}
      {variant === "Back" && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="h-full w-full">
          <Card className="h-full w-full">
            <CardHeader>
              <h1>{event.eventName}</h1>
            </CardHeader>
            <CardBody className="h-full w-full">
              <p>Back</p>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

const FlippableCard = withClick(OverridePictureCard)

export default FlippableCard
