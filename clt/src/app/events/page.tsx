"use client"
import { Swiper } from "swiper/react"
import dynamic from "next/dynamic"
import { SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./3d-carousel.css"
import { Card, CardBody, Spinner } from "@nextui-org/react"
import FlippableCard from "@/components/card/flippable-picture-card"
import { useState } from "react"
import { useEvents } from "@/components/layout/EventsProvider"
import { IEvent } from "@/types/IEvent"

const Chrono = dynamic(() => import("react-chrono").then((mod) => mod.Chrono), {
  ssr: false,
})
export default function EventPage() {
  const eventContext = useEvents()
  const events = sort(eventContext.events)
  const timeline = events.map((event) => {
    return {
      cardTitle: event.eventName,
      date: new Date(event.eventDate),
      cardDetailedText: event.eventDescription,
    }
  })
  const [activeIndex, setActiveIndex] = useState(0)  
  function sort(events: IEvent[]): IEvent[] {
    return events.sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();
      return dateA - dateB;
    });
  }
  return (
    <div className="h-screen w-screen p-1">
      <div className="flex flex-col lg:flex-row h-full w-full ">
        <Card className="w-full lg:w-8/12 min-h-full bg-indigo-300" shadow="lg">
          <CardBody className="flex justify-center items-center">
            {events && events.length > 0 ? (
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={false}
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
                {events && events.length > 0 ? (
                  events.map((event) => (
                    <SwiperSlide key={event._id} className="pt-10">
                      <FlippableCard
                        event={event}
                        shadow={"none"}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <div> Nothing Yet </div>
                )}
              </Swiper>
            ) : (
              <div>
                Loading events... <Spinner />
              </div>
            )}
          </CardBody>
        </Card>
        <Card
          className="w-full lg:w-4/12 min-h-full mt-1 lg:mt-0 lg:ml-1 bg-indigo-300"
          shadow="lg"
        >
          <CardBody className="flex justify-center items-center">
              <Chrono
                items={timeline}
                mode="VERTICAL_ALTERNATING"
                scrollable={{ scrollbar: true }}
                disableToolbar
                activeItemIndex={activeIndex}
              />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
