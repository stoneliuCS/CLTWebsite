import { Card, CardBody, CardFooter, CardHeader, Image, Tooltip } from "@nextui-org/react";

interface EboardCardProps {
    name: string,
    bio: string,
    role: string,
    photoUrl: string,
}

export default function EboardCard(props: EboardCardProps) {
    return (
        <Tooltip showArrow={true} content={props.bio} size="lg" classNames={{
            base: "bg-transparent text-black p-8",
            content: "max-w-xs h-full rounded-lg"
        }}>
            <Card className="py-4 h-full">
                <CardHeader className="text-center flex items-center justify-center flex-col">
                    <div>
                        <strong> {props.name} </strong>
                    </div>
                    <div>
                        {props.role}
                    </div>
                </CardHeader>
                <CardBody className="py-2 flex items-center overflow-y-hidden">
                    <Image
                        alt="Eboard Bio"
                        className="object-cover rounded-xl"
                        src={props.photoUrl}
                        height={300}
                        width={300}
                    />
                </CardBody>
            </Card>
        </Tooltip>
    )
}