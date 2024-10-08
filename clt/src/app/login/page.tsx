"use client"
import HomeHeroBanner from "@/components/hero/hero-banner"
import { Image, Divider, Button, Tooltip } from "@nextui-org/react"
import { FaGoogle } from "react-icons/fa"
import { signIn, useSession } from "next-auth/react"

export default function Login() {
  const { data: session, status } = useSession()
  if (session)
    return (
      <p> You cannot access the login page if you are already logged in.</p>
    )
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
          <div className="w-6/12 lg:w-4/12 flex flex-col justify-center items-center">
            <Divider className="mb-2" />
            <Tooltip content="You will not be allowed to login if you do not have edit access to the CLT Shared Drive">
              <Button
                className="w-full bg-white"
                size="lg"
                startContent={<FaGoogle />}
                onPress={() => {
                  signIn("google")
                }}
              >
                Login With Google
              </Button>
            </Tooltip>
            <Divider className="mt-2" />
          </div>
        </div>
      }
    />
  )
}
