"use client";


import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu,Sparkles } from "lucide-react"
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import {ModeToggle }  from "@/components/mode-toggle";
import MobileSidebar from "@/components/mobile-sidebar";
const font = Poppins({
    weight: '600',
    subsets: ["latin"]
})
const NavBar = () => {
    return (
        <div className=" w-full z-50 flex justify-between items-center py-2 px-4 bordrer-b border-primary/10 bg-secondary">
            <div className="flex items-center">
                {/* <Menu className="block md:hidden" /> */}
                <MobileSidebar/>
                <Link href="/" >
                    <h1 className={cn(" hidden md:block text-2xl md:text-3xl font-bold text-primary", font.className)}>companion.ai</h1>
                </Link>

            </div>
            <div className="flex items-center gap-x-3">
                <Button variant="primium"size="sm" className="">升级更新
                    <Sparkles className="ml-2 h-4 w-4 text-white fill-white"></Sparkles>
                </Button>
               <ModeToggle/>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}

export default NavBar;