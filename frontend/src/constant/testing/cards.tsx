import PictureCard from "@/components/layout/hero/picture-card"
import NextImage from "next/image"

const cards = [
  <PictureCard
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
          priority
        />
      </div>
    }
    description="Test Description"
  />,

  <PictureCard
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

  <PictureCard
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

export default cards
