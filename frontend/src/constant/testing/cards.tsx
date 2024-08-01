import PictureCard from "@/components/layout/hero/picture-card"
import NextImage from "next/image"

const cards = [
  <PictureCard
    key="1"
    eventName="Beach Day!"
    eventDate={new Date()}
    eventImage={
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
    eventDescription="Test Description"
  />,

  <PictureCard
    key="2"
    eventName="Calligraphy Night!"
    eventDate={new Date()}
    eventImage={
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
    eventDescription="Test Description"
  />,

  <PictureCard
    key="3"
    eventName="Ice Skating Outing!"
    eventDate={new Date()}
    eventImage={
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
    eventDescription="Test Description"
  />,
  <PictureCard
  key="4"
  eventName="Ice Skating Outing!"
  eventDate={new Date()}
  eventImage={
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
  eventDescription="Test Description"
/>,
]

export default cards
