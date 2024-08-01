"use client"
import { Swiper } from "swiper/react"
import { SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import cards from "@/constant/testing/cards"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./3d_carousel.css"
import { Card, CardBody, CardHeader } from "@nextui-org/react"

export default function EventPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <Card className="w-11/12 h-11/12 bg-indigo-300" shadow="lg">
        <CardHeader className="flex items-center justify-center">
          <h1
            className={`sm:text-xl md:text-3xl lg:text-4xl text-center text-slate-200 font-bold text-slate-800 drop-shadow-lg pt-4`}
          >
            Viewing Upcoming Events
          </h1>
        </CardHeader>
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
            {cards.map((card, idx) => (
              <SwiperSlide key={idx * 2}>{card}</SwiperSlide>
            ))}
          </Swiper>
        </CardBody>
      </Card>
    </div>
  )
}
