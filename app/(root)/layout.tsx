import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import React from "react"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <NavBar />
      <div className="flex flex-row w-full h-full">
      <div className="hidden md:flex flex-col mt-4 w-20 inset-y-0 ">
        <SideBar />
      </div>
      <main className="w-full"> {children}</main>
      </div>
      

    </div>
  )
}
export default RootLayout
