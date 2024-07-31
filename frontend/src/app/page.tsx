"use client"
import HeroBanner from "@/components/layout/hero/hero"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Image } from "@nextui-org/image"
import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import responsive from "@/constant/carousel"
import cards from "@/constant/testing/cards"
import NextImage from "next/image"
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Link,
  Button,
  Slider,
} from "@nextui-org/react"
import { SocialIcon } from "react-social-icons"
import Logo from "@/components/assets/logo"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroBanner
        backgroundColor="bg-sky-100"
        content={
          <div className="flex flex-col items-center justify-center -translate-y-10">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Image
                src={"/cltpic.svg"}
                height={400}
                width={500}
                alt="clt background"
              />
            </motion.div>
            <div className="text-center">
              <h1 className="sm:text-xl md:text-3xl lg:text-4xl h-[50px] font-bold text-gray-900">
                <TypeAnimation
                  sequence={[
                    "Welcome to Chinese Language Table @NEU",
                    5000,
                    "欢迎,来到中文表.",
                    5000,
                  ]}
                  speed={50}
                  style={{ display: "inline-block" }}
                  cursor={false}
                  repeat={Infinity}
                />
              </h1>

              <div className="flex items-center justify-center gap-x-6 pt-10">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View Upcoming Events
                </a>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Learn About What We Do <span aria-hidden="true">→</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        }
      />
      <HeroBanner
        backgroundColor="bg-indigo-200"
        content={
          <div className=" relative flex flex-col justify-center">
            <h1
              className={`sm:text-xl md:text-3xl lg:text-4xl text-center text-slate-200 font-bold pb-4 text-slate-800	`}
            >
              See What We Have Been Up To!
            </h1>
            <NextImage
              className="absolute top-0 left-0 z-10 hidden lg:block"
              src={"/scribble-svgrepo-com.svg"}
              alt=""
              width={200}
              height={200}
              style={{
                transform: "translateX(20px) translateY(-25px)",
              }}
            />
            <NextImage
              className="absolute top-0 right-0 z-10 hidden lg:block"
              src={"/scribble-svgrepo-com.svg"}
              alt=""
              width={200}
              height={200}
              style={{
                transform:
                  "scaleX(-1) rotate(0deg) translateX(20px) translateY(-25px)",
              }}
            />
            <Carousel
              responsive={responsive}
              focusOnSelect={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2500}
              keyBoardControl={true}
              arrows={false}
            >
              {cards.map((card, index) => (
                <div key={index}>{card}</div>
              ))}
            </Carousel>
          </div>
        }
      />

      <HeroBanner
        backgroundColor="bg-pink-200"
        content={
          <div className="flex justify-center items-center flex-col">
            <div className="flex flex-col relative gap-4 items-center">
              <Card className="w-[450px]">
                <CardHeader className="flex gap-3">
                  <Logo />
                  <div className="flex flex-col">
                    <p className="text-md">CLT</p>
                    <p className="text-small text-default-500">
                      We invite you to come join us!
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex items-center">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col justify-center items-center">
                      {<SocialIcon url="https://instagram.com" />}
                      {
                        <Link href="https://www.instagram.com/neu_clt/">
                          <strong> Our Instagram! </strong>
                        </Link>
                      }
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      {<SocialIcon url="https://web.groupme.com/" />}
                      {
                        <Link href="https://web.groupme.com/join_group/66713728/cSnDD7zH">
                          <strong> Our GroupMe! </strong>
                        </Link>
                      }
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      {<SocialIcon url="https://linktr.ee/" />}
                      {
                        <Link href="https://linktr.ee/neuclt">
                          <strong> Our LinkTree! </strong>
                        </Link>
                      }
                    </div>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
              <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                shadow="sm"
              >
                <CardBody>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                      <Image
                        alt="Album cover"
                        className="object-cover"
                        height={200}
                        shadow="md"
                        src="https://nextui.org/images/album-cover.png"
                        width="100%"
                      />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0">
                          <h3 className="font-semibold text-foreground/90">
                            Daily Mix
                          </h3>
                          <p className="text-small text-foreground/80">
                            12 Tracks
                          </p>
                          <h1 className="text-large font-medium mt-2">
                            Frontend Radio
                          </h1>
                        </div>
                      </div>

                      <div className="flex flex-col mt-3 gap-1">
                        <Slider
                          aria-label="Music progress"
                          classNames={{
                            track: "bg-default-500/30",
                            thumb:
                              "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                          }}
                          color="foreground"
                          defaultValue={33}
                          size="sm"
                        />
                        <div className="flex justify-between">
                          <p className="text-small">1:23</p>
                          <p className="text-small text-foreground/50">4:32</p>
                        </div>
                      </div>

                      <div className="flex w-full items-center justify-center">
                        <Button
                          isIconOnly
                          className="data-[hover]:bg-foreground/10"
                          radius="full"
                          variant="light"
                        ></Button>
                        <Button
                          isIconOnly
                          className="data-[hover]:bg-foreground/10"
                          radius="full"
                          variant="light"
                        ></Button>
                        <Button
                          isIconOnly
                          className="w-auto h-auto data-[hover]:bg-foreground/10"
                          radius="full"
                          variant="light"
                        ></Button>
                        <Button
                          isIconOnly
                          className="data-[hover]:bg-foreground/10"
                          radius="full"
                          variant="light"
                        ></Button>
                        <Button
                          isIconOnly
                          className="data-[hover]:bg-foreground/10"
                          radius="full"
                          variant="light"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <NextImage
              className="absolute top-0 left-0 -z-10"
              src={"/phone.svg"}
              alt="phone"
              width={500}
              height={500}
              style={{
                transform: "translateX(-400px) rotate(45deg) translateY(-50px)",
              }}
            />
            <NextImage
              className="absolute top-0 right-0 -z-10"
              src={"/phone.svg"}
              alt="phone"
              width={500}
              height={500}
              style={{
                transform:
                  "scaleX(-1) translateX(-400px) rotate(45deg) translateY(-50px)",
              }}
            />
          </div>
        }
      />
    </div>
  )
}
