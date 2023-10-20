import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import React from "react"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <NavBar />
      <div className="hidden md:flex flex-col w-20 mt-14 fixed inset-y-0 ">
        <SideBar />
      </div>

      <main> {children}</main>

    </div>
  )
}
export default RootLayout
