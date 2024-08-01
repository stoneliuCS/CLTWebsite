import IEvent from "@/types/IEvent"
import {
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { motion } from "framer-motion"

type ShadowType = "none" | "sm" | "md" | "lg" | undefined

export default function PictureCard(props: IEvent, shadow : ShadowType = "none") {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div>
      <div className=" relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpen}
        >
          <Card className="h-[70vh] w-full" isBlurred shadow={shadow}>
            <div className=" h-full w-full">{props.eventImage}</div>
          </Card>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
          <Card className="w-6/12" shadow="lg">
            <CardBody>
              <p className="text-center truncate">
                <strong>{props.eventName}</strong>
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        placement={"center"}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {props.eventName}
            </ModalHeader>
            <Divider />
            <ModalBody className="flex flex-col">
              <p>{props.eventDescription}</p>
            </ModalBody>
            <Divider />
            <ModalFooter className="flex justify-start">
              <p> {props.eventDate.toDateString()} </p>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  )
}
