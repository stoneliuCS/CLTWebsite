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
import { useEffect, useState } from "react"
import { IEvent, TimeLineEvent } from "@/types/IEvent"

const Chrono = dynamic(() => import("react-chrono").then((mod) => mod.Chrono), {
  ssr: false,
})

export default function EventPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [timelineEvents, setTimelineEvents] = useState<TimeLineEvent[] | null>(
    null
  )
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async (retryCount = 0) => {
      try {
        const res = await fetch("/api/events", {
          method: "GET",
        });
        if (res.status === 429) {
          if (retryCount < 5) {
            // Retry after a delay with exponential backoff
            setTimeout(() => fetchEvents(retryCount + 1), Math.pow(2, retryCount) * 1000);
          } else {
            throw new Error("Too many requests. Please try again later.");
          }
        } else if (!res.ok) {
          throw new Error("Error fetching all events");
        } else {
          const events = await res.json();
          setEvents(events.data);
        }
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
    return () => {
      isMounted = false; 
    };
  }, [])

  useEffect(() => {
    if (events && events.length > 0) {
      const timeline = events.map((event) => {
        return {
          cardTitle: event.eventName,
          date: new Date(event.eventDate),
          cardDetailedText: event.eventDescription,
        }
      })
      setTimelineEvents(timeline)
    }
  }, [events])
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
            {timelineEvents && timelineEvents.length > 0 ? (
              <Chrono
                items={timelineEvents}
                mode="VERTICAL_ALTERNATING"
                scrollable={{ scrollbar: true }}
                disableToolbar
                activeItemIndex={activeIndex}
              />
            ) : (
              <div>
                Loading Events Timeline: <Spinner />
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
