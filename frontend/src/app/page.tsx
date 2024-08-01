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
} from "@nextui-org/react"
import { SocialIcon } from "react-social-icons"
import Logo from "@/components/assets/logo"
import { Slider } from "@nextui-org/slider"
import socials from "@/constant/social"

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
          <div className="relative flex flex-col gap-4 items-center justify-center mx-5">
            <h1
              className={`sm:text-xl md:text-3xl lg:text-4xl text-center text-slate-200 font-bold pb-4 text-slate-800	drop-shadow-lg`}
            >
              Connect With Our Socials!
            </h1>
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {socials.map((social) => (
                    <div className="flex flex-col justify-center items-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SocialIcon url={social.url} href={social.href} />
                      </motion.div>
                      <Link href={social.href}>
                        <strong> {social.caption} </strong>
                      </Link>
                    </div>
                  ))}
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
            <NextImage
              className="absolute top-0 left-0 -z-10 hidden lg:block"
              src={"/phone.svg"}
              alt="phone"
              width={500}
              height={500}
              style={{
                transform: "translateX(0px) rotate(45deg) translateY(100px)",
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
                  "scaleX(-1) translateX(0px) rotate(45deg) translateY(100px)",
              }}
            />
          </div>
        }
      />
    </div>
  )
}
