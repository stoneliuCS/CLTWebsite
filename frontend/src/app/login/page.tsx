import HomeHeroBanner from "@/components/layout/hero/home-hero"
import { Input, Image, Divider, Button } from "@nextui-org/react"
import { FaGoogle } from "react-icons/fa"

export default function Login() {
  return (
    <HomeHeroBanner
      backgroundColor="bg-blue-50"
      content={
        <div className="flex flex-col items-center">
          <Image
            src={"/cltpic.svg"}
            height={300}
            width={300}
            alt="clt background"
          />
          <h2 className="font-semibold text-md mb-2">Login as a CLT Member</h2>
          <div className="w-4/12 flex flex-col justify-center items-center">
            <Divider className="mb-2" />
            <Input className="mb-2" type="email" label="Email" size="sm" />
            <Button className="w-full mb-2" color="primary"> Login </Button>
             <p> Or </p>
            <Button
              className="w-full mt-2 bg-white"
              size="lg"
              startContent={<FaGoogle />}
            >
              Login With Google
            </Button>
            <Divider className="mt-2" />
          </div>
        </div>
      }
    />
  )
}
