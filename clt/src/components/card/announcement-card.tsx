import { IAnnouncement } from "@/types/IAnnouncement"
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
import NextImage from "next/image"

type ShadowType = "none" | "sm" | "md" | "lg" | undefined

interface IAnnouncementCardProps {
  announcement: IAnnouncement
  shadow: ShadowType
}

export default function AnnouncementCard(props: IAnnouncementCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="h-full w-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Card className="w-full h-full" shadow={props.shadow} isPressable onClick={onOpen}>
          <NextImage
            src={props.announcement.announcementPhoto!.src}
            alt={props.announcement.announcementPhoto!.alt}
            fill
            objectFit="contain"
            priority
          />
        </Card>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
        <Card className="w-6/12" shadow="lg">
          <CardBody>
            <p className="text-center truncate">
              {props.announcement.announcementName}
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
              {props.announcement.announcementName}
            </ModalHeader>
            <Divider />
            <ModalBody className="flex flex-col">
              <p>{props.announcement.announcementDescription}</p>
            </ModalBody>
            <Divider />
            <ModalFooter className="flex justify-start">
              <p> {new Date(props.announcement.announcementDate).toDateString()} </p>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  )
}
