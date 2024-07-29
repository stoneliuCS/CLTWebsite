"use client"
import HeroBanner from "@/components/layout/hero/hero"
import HeroCard from "@/components/layout/hero/hero-card"
import Carousel from "react-multi-carousel"
import { TypeAnimation } from "react-type-animation"
import "react-multi-carousel/lib/styles.css"
import NextImage from "next/image"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, 
  },
}
const cards = [
  <HeroCard
    key="1"
    title="Beach Day!"
    date={new Date()}
    image={
      <div className="relative w-full h-full">
        <NextImage
          src="/beach_day.jpg"
          alt="Beach Day"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority // Add priority if this is an LCP image
        />
      </div>
    }
    description="Test Description"
  />,

  <HeroCard
    key="2"
    title="Calligraphy Night!"
    date={new Date()}
    image={
      <div className="relative w-full h-full">
        <NextImage
          src={"/calligraphy_night.jpg"}
          alt="Chinese Language Table Logo"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    }
    description="Test Description"
  />,

  <HeroCard
    key="3"
    title="Ice Skating Outing!"
    date={new Date()}
    image={
      <div className="relative w-full h-full">
        <NextImage
          src={"/ice_skating.jpg"}
          alt="Chinese Language Table Logo"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    }
    description="Test Description"
  />,
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <div className="relative isolate px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#06b6d4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-5xl h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-9xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                <div className="relative h-[120px]">
                  <TypeAnimation
                    sequence={[
                      "Welcome to Chinese Language Table.",
                      1000,
                      "欢迎,来到中文表.",
                      3000,
                    ]}
                    speed={50}
                    style={{ display: "inline-block" }}
                    cursor={false}
                    repeat={Infinity}
                  />
                </div>
              </h1>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View Upcoming Events
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn About What We Do <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroBanner
        headerText="See What We Have Been Up To!"
        chineseHeaderText="看看我们上个学期都做了什么！"
        backgroundColor="bg-blue-800"
        headerColor="text-slate-200"
        content={
          <Carousel
            responsive={responsive}
            centerMode={true}
            focusOnSelect={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2500}
            keyBoardControl={true}
            ssr={true}
          >
            {cards.map((card, index) => (
              <div key={index}>{card}</div>
            ))}
          </Carousel>
        }
      />
    </div>
  )
}
