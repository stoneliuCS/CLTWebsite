import { IAnnouncement } from "@/types/IAnnouncement"
import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"

type ShadowType = "none" | "sm" | "md" | "lg" | undefined

interface IAnnouncementCardProps {
  announcement: IAnnouncement
  shadow: ShadowType
}

export default function AnnouncementCard(props: IAnnouncementCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className="relative h-full w-full">
      <Card className="h-full w-full justify-center items-center flex flex-row gap-x-4 bg-gradient-to-r from-sky-100 to-blue-100" isHoverable isPressable onPress={onOpen}>
        <Image
          removeWrapper
          alt={props.announcement.announcementPhoto.alt}
          src={props.announcement.announcementPhoto.src}
          className="z-0 w-full h-full object-contain"
        />
      </Card>
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
        <Card className="w-6/12" shadow="lg">
          <CardBody>
            <p className="text-center truncate">
              <strong> {props.announcement.announcementName}</strong>
            </p>
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">{props.announcement.announcementName}</ModalHeader>
              <Divider />
              <ModalBody className="p-5">
                <p>
                 Date: <strong> {props.announcement.announcementDate} </strong>
                </p>
                <p>
                  {props.announcement.announcementDescription}
                </p>
              </ModalBody>
              <Divider />
              <ModalFooter className="flex-col flex overflow-y-scroll">
                <strong>Announcement Links: </strong>
                {props.announcement.announcementLinks && props.announcement.announcementLinks.length > 0 ? (
                  props.announcement.announcementLinks.map((link, key) => {
                    return (
                      <Link href={link} key={key}>
                        {link}
                      </Link>
                    )
                  })
                ) : (
                  <div> No Links </div>
                )}
              </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
