import { IAnnouncement } from "@/types/IAnnouncement"
import {
  Card,
  CardBody,
  useDisclosure,
} from "@nextui-org/react"
import { motion } from "framer-motion"
import NextImage from "next/image"

type ShadowType = "none" | "sm" | "md" | "lg" | undefined

interface IPictureCardProps {
  announcement: IAnnouncement
  shadow: ShadowType
}

export default function AnnouncementCard(props: IPictureCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div>
      <div className=" relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpen}
        >
          <Card className="h-[70vh] w-full" shadow={props.shadow}>
            <CardBody className="w-full h-full flex flex-row">
              <NextImage
                src={props.announcement.announcementPhoto!.src}
                alt={props.announcement.announcementPhoto!.alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
                className="border"
              />
              <div>
                <p>
                {props.announcement.announcementName}
                </p>
                <p>{props.announcement.announcementDescription}</p>
                <p> {props.announcement.announcementDate} </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
