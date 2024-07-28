import Image from "next/image"

export default function Logo() {
  return (
    <Image
      src={"/clt_logo.jpg"}
      alt="Chinese Language Table Logo"
      width={50}
      height={50}
      className="rounded-full"
    ></Image>
  )
}
