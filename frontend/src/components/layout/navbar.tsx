import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import Logo from "../assets/logo"

export default function NavBar() {
  return (
    <Navbar
      className="bg-gradient-to-r from-cyan-300 to-blue-200 shadow-md  overflow-x-scroll"
      shouldHideOnScroll={true}
      maxWidth="full"
    >
      <NavbarBrand className="gap-x-4">
        <Logo />
        <p className="font-bold text-black truncate">Chinese Language Table</p>
      </NavbarBrand>
      <NavbarContent className="font-semibold text-slate-800" justify="end">
        <NavbarItem> Events </NavbarItem>
        <NavbarItem> Meet the Eboard </NavbarItem>
        <NavbarItem> About Chinese Language Table </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
