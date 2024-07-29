"use client"
import HeroBanner from "@/components/layout/hero/hero"
import HeroCard from "@/components/layout/hero/hero-card"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css" // Ensure you have this import for styling

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}
const cards = [<HeroCard key="1" />, <HeroCard key="2" />, <HeroCard key="2" />]

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
          <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to the Official Northeastern Chinese Language Table
                Event's Website
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
        headerText="See What We Have Been Up To This Past Semester!"
        backgroundColor="bg-blue-800"
        headerColor="text-slate-200"
        content={
          <Carousel responsive={responsive}>
            {cards.map((card, index) => (
              <div key={index}>{card}</div>
            ))}
          </Carousel>
        }
      />
    </div>
  )
}
