import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  title: string
  description: string
  date: Date
  image: ReactNode
}

export default function PictureCard(props: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onOpen}>
        <Card className="h-[70vh] w-full" isBlurred shadow="lg">
          <div className="relative h-full w-full">{props.image}</div>
        </Card>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
        <Card className="w-6/12	" shadow="lg">
          <CardBody>
            <p className="text-center truncate">
              <strong>{props.title}</strong> {props.date.toDateString()}
            </p>
          </CardBody>
        </Card>
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
              {props.title}
            </ModalHeader>
            <ModalBody>
              <p>{props.description}</p>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  )
}
