import {
  Button,
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
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Card
          className="bg-gradient-to-r from-cyan-300 to-blue-200 h-[70vh]"
          shadow="lg"
          isHoverable={true}
        >
          <div className="relative h-full w-full">{props.image}</div>
        </Card>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
        <Card
          className="w-full max-w-md"
          shadow="lg"
          isPressable
          onPress={onOpen}
        >
          <CardBody>
            <p className="text-center">
              <strong>{props.title} </strong>
              {props.date.toDateString()}
            </p>
          </CardBody>
        </Card>
      </div>
      <Modal
        isOpen={isOpen}
        placement={"auto"}
        onOpenChange={onOpenChange}
        size="xl"
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
