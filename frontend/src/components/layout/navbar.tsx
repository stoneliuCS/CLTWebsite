import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react"
import Logo from "../assets/logo"

export default function NavBar() {
  return (
    <Navbar
      className="bg-gradient-to-r from-cyan-300 to-blue-200 shadow-md flex justify-start"
      shouldHideOnScroll={true}
    >
      <NavbarBrand className="gap-x-4">
        <Logo />
        <p className="font-bold text-black">Chinese Language Table</p>
      </NavbarBrand>
      <NavbarContent
        className="font-semibold	text-slate-800"
        justify="start"
      ></NavbarContent>
    </Navbar>
  )
}
