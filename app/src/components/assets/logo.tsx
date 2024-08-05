import { Link } from "@nextui-org/react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Logo() {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link href="/">
        <Image
          src={"/clt_logo.svg"}
          alt="Chinese Language Table Logo"
          width={50}
          height={50}
          className="rounded-full shadow-sm"
        ></Image>
      </Link>
    </motion.div>
  )
}
