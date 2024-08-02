"use client"
import { Swiper } from "swiper/react"
import { SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import events from "@/constant/events"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./3d_carousel.css"
import { Card, CardBody } from "@nextui-org/react"
import FlippableCard from "@/components/card/flippable-picture-card"

export default function EventPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <Card className="w-11/12 h-5/6 bg-indigo-300" shadow="lg">
        <CardBody className="flex items-center justify-center">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 2.5,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-full"
          >
            {events.map((event, idx) => (
              <SwiperSlide key={idx * 2}>
                <FlippableCard
                  event={event}
                  shadow={"none"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </CardBody>
      </Card>
    </div>
  )
}
