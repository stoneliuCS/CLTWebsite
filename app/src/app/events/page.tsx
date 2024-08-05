"use client"
import { Swiper } from "swiper/react"
import dynamic from "next/dynamic"
import { SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import { events, eventTimeLineItems } from "@/constant/events"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./3d_carousel.css"
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react"
import FlippableCard from "@/components/card/flippable-picture-card"
import { useState } from "react"

const Chrono = dynamic(() => import("react-chrono").then((mod) => mod.Chrono), {
  ssr: false,
})

export default function EventPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className="flex flex-col p-1">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full">
        <Card className="w-full lg:w-8/12 h-[95vh] bg-indigo-300" shadow="lg">
          <CardHeader className="flex justify-center">
            <p className="font-bold"> Showing Current Events: </p>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center ">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 300,
                modifier: 2.5,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation
              breakpoints={{
                1200: {
                  slidesPerView: "auto",
                },
                0: {
                  slidesPerView: 1,
                },
              }}
              initialSlide={activeIndex}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full h-full"
            >
              {events.map((event, idx) => (
                <SwiperSlide key={idx * 2}>
                  <FlippableCard event={event} shadow={"none"} />
                </SwiperSlide>
              ))}
            </Swiper>
          </CardBody>
        </Card>
        <Card
          className="w-full lg:w-4/12 h-[50vh] lg:h-[95vh] mt-1 lg:mt-0 lg:ml-1 bg-indigo-300"
          shadow="lg"
        >
          <CardHeader className="flex justify-center">
            <p className="font-bold"> Showing Current Events Timeline: </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <Chrono
              items={eventTimeLineItems}
              mode="VERTICAL_ALTERNATING"
              scrollable={{ scrollbar: true }}
              disableToolbar
              activeItemIndex={activeIndex}
            />
          </CardBody>
        </Card>
      </div>
      <div>
        <Card className="w-full mt-1">
          <CardHeader className="flex justify-center items-center">
            <h1>
              Current Event Form & Registration
            </h1>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
