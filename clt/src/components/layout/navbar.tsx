"use client"
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import Logo from "../assets/logo"
import { ReactNode, useState } from "react"
import { MdEvent } from "react-icons/md"
import { FaPeopleLine } from "react-icons/fa6"
import { FaInfoCircle } from "react-icons/fa"
import { motion } from "framer-motion"
import { FaSignInAlt } from "react-icons/fa"
import { useSession } from "next-auth/react"

interface ITabItem {
  tabName: string
  tabIcon?: ReactNode
  link?: string
}

const eventTab: ITabItem = {
  tabName: "Events",
  tabIcon: <MdEvent />,
  link: "/events",
}
const eboardTab: ITabItem = {
  tabName: "Meet the Eboard",
  tabIcon: <FaPeopleLine />,
}
const aboutTab: ITabItem = {
  tabName: "About Chinese Language Table",
  tabIcon: <FaInfoCircle />,
}
const eboardSignInTab: ITabItem = {
  tabName: "Eboard Login",
  tabIcon: <FaSignInAlt />,
  link : "/login"
}

const menuItems: ITabItem[] = [eventTab, eboardTab, aboutTab, eboardSignInTab]

export default function NavBar() {
  const { data: session, status } = useSession()
  return (
    <Navbar
      className="bg-gradient-to-r from-cyan-300 to-blue-200 shadow-md"
      shouldHideOnScroll={true}
      maxWidth="full"
    >
      <NavbarBrand className="gap-x-4">
        <Logo />
        <Link href="/">
          <p className="font-bold text-black truncate">
            Chinese Language Table
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="font-semibold text-slate-800 gap-x-10 hidden lg:flex"
        justify="end"
      >
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="flex items-center">
                {item.tabIcon}
                <Link className="ml-2 text-black" href={item.link}>
                  {item.tabName}
                </Link>
              </div>
            </motion.div>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenuToggle
        className="sm:hidden"
      />
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="flex items-center mt-5">
                {item.tabIcon}
                <Link className="ml-2 text-black" href={item.link}>
                  {item.tabName}
                </Link>
              </div>
            </motion.div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
