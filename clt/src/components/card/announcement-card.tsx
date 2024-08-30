import { IAnnouncement } from "@/types/IAnnouncement"
import {
  Card,
  CardBody,
} from "@nextui-org/react"
import NextImage from "next/image"

type ShadowType = "none" | "sm" | "md" | "lg" | undefined

interface IPictureCardProps {
  announcement: IAnnouncement
  shadow: ShadowType
}

export default function AnnouncementCard(props: IPictureCardProps) {
  return (
    <Card className="h-full w-full" shadow={props.shadow}>
      <CardBody>
        <div className="flex flex-row justify-start">
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
        </div>
      </CardBody>
    </Card>
  )
}
