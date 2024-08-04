"use client"
import { Swiper } from "swiper/react"
import { SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import { events, eventTimeLineItems } from "@/constant/events"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./3d_carousel.css"
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import FlippableCard from "@/components/card/flippable-picture-card"
import { Chrono } from "react-chrono"

export default function EventPage() {
  return (
    <div className="p-1">
      {/* <Card className="bg-indigo-300 mb-1">
        <CardHeader className="flex items-center justify-center">
        <h1
          className={`sm:text-xl md:text-3xl lg:text-4xl text-center text-slate-200 font-bold text-slate-800 drop-shadow-lg`}
        >
          Catch Up On Our Events!
        </h1>

        </CardHeader>
      </Card> */}
      <div className="flex flex-col lg:flex-row items-center justify-center flex mt-5">
        <Card className="w-full lg:w-8/12 h-[85vh] bg-indigo-300 " shadow="lg">
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
          className="w-full lg:w-4/12 h-[30vh] lg:h-[85vh] mt-1 lg:mt-0 lg:ml-1 bg-indigo-300"
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
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
