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

              <div className="flex flex-col lg:flex-row items-center justify-center gap-x-6 pt-10 gap-y-5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View Upcoming Events
                  </a>
                </motion.div>
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
          <div className="relative flex flex-col justify-center items-center">
            <h1
              className={`sm:text-xl md:text-3xl lg:text-4xl text-center text-slate-200 font-bold pb-4 text-slate-800	drop-shadow-lg`}
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
                transform: " rotate(0deg) translateX(100px) translateY(-10px)",
              }}
            />
            <NextImage
              className="absolute bottom-0 right-0 z-10 hidden lg:block"
              src={"/scribble-svgrepo-com.svg"}
              alt=""
              width={200}
              height={200}
              style={{
                transform:
                  "scaleX(-1) scaleY(-1) rotate(0deg) translateX(100px) translateY(-70px)",
              }}
            />
            <Carousel
              className="rounded-3xl w-9/12"
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
          <div className="relative flex flex-col gap-4 items-center justify-center">
            <Card className="h-[75vh]">
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
              <CardBody className="flex flex-col items-center gap-5">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col justify-center items-center">
                    {
                      <SocialIcon
                        url="https://instagram.com"
                        href="https://www.instagram.com/neu_clt/"
                      />
                    }
                    {
                      <Link href="https://www.instagram.com/neu_clt/">
                        <strong> Our Instagram! </strong>
                      </Link>
                    }
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {
                      <SocialIcon
                        url="https://web.groupme.com/"
                        href="https://web.groupme.com/join_group/66713728/cSnDD7zH"
                      />
                    }
                    {
                      <Link href="https://web.groupme.com/join_group/66713728/cSnDD7zH">
                        <strong> Our GroupMe! </strong>
                      </Link>
                    }
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {
                      <SocialIcon
                        url="https://www.spotify.com/"
                        href="https://open.spotify.com/playlist/6WrYjhEIMZaI17Nz1bV2PA?si=3a9c03074681423b&utm_medium=share&utm_source=linktree"
                      />
                    }
                    {
                      <Link href="https://open.spotify.com/playlist/6WrYjhEIMZaI17Nz1bV2PA?si=3a9c03074681423b&utm_medium=share&utm_source=linktree">
                        <strong> Our Spotify Playlist! </strong>
                      </Link>
                    }
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {
                      <SocialIcon
                        url="https://www.facebook.com/"
                        href="https://www.facebook.com/neuchanguagetable/"
                      />
                    }
                    {
                      <Link href="https://www.facebook.com/neuchanguagetable/">
                        <strong> Our Facebook! </strong>
                      </Link>
                    }
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {
                      <SocialIcon
                        url="https://gmail.com"
                        href="https://gmail.us3.list-manage.com/subscribe?u=ff59e60d727298a57e28a4e6f&id=3bc42e4945"
                      />
                    }
                    {
                      <Link href="https://gmail.us3.list-manage.com/subscribe?u=ff59e60d727298a57e28a4e6f&id=3bc42e4945">
                        <strong> Join Our Mailing List! </strong>
                      </Link>
                    }
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {
                      <SocialIcon
                        url="https://linktr.ee/"
                        href="https://linktr.ee/neuclt"
                      />
                    }
                    {
                      <Link href="https://linktr.ee/neuclt">
                        <strong> Our LinkTree! </strong>
                      </Link>
                    }
                  </div>
                </div>
                <Card
                  isBlurred
                  className="border-none bg-background/60 dark:bg-default-100/50 w-full h-full flex flex-grow"
                  shadow="sm"
                >
                  <CardBody>
                    <div className="grid grid-cols-12 gap-6 items-center justify-center">
                      <div className="relative col-span-4">
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
                            <p className="text-small text-foreground/50">
                              4:32
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
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
            <NextImage
              className="absolute top-0 left-0 -z-10 hidden lg:block"
              src={"/phone.svg"}
              alt="phone"
              width={500}
              height={500}
              style={{
                transform: "translateX(0px) rotate(45deg) translateY(0px)",
              }}
            />
            <NextImage
              className="absolute top-0 right-0 -z-10 hidden lg:block"
              src={"/phone.svg"}
              alt="phone"
              width={500}
              height={500}
              style={{
                transform:
                  "scaleX(-1) translateX(0px) rotate(45deg) translateY(0px)",
              }}
            />
          </div>
        }
      />
    </div>
  )
}
