import { ReactNode } from "react"
import { TypeAnimation } from "react-type-animation"
import { useState } from "react"
interface Props {
  headerText: string
  chineseHeaderText: string
  headerColor: string
  backgroundColor: string
  content: ReactNode
}

export default function HeroBanner(props: Props) {
  return (
    <div className={props.backgroundColor}>
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
        <div className="mx-auto max-w-5xl h-lvh">
          <div className="text-center pt-20">
            <h1
              className={`text-3xl ${props.headerColor} font-bold tracking-tight sm:text-6xl`}
            >
              <div className="relative h-[50px]">
                <TypeAnimation
                  sequence={[
                    props.headerText,
                    1000,
                    props.chineseHeaderText,
                    3000,
                    props.headerText,
                    1000,
                  ]}
                  speed={50}
                  style={{ display: "inline-block" }}
                  repeat={Infinity}
                  cursor={false}
                ></TypeAnimation>
              </div>
            </h1>
          </div>
          <div className="mt-10">{props.content}</div>
        </div>
      </div>
    </div>
  )
}
