"use client"
import { Home, Plus, Settings } from "lucide-react"
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
    const pathname = usePathname();
    const router = useRouter()
    const routes = [{
        icon: Home,
        href: "/",
        label: "Home",
        pro: false
    },
    {
        icon: Plus,
        href: "/component/new",
        label: "Create",
        pro: true
    },
    {
        icon: Settings,
        href: "/settings",
        label: "Settings",
        pro: false
    }];
    const onNavigate = (url:string,pro:boolean)=>{
          router.push(url)
           
    }
    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
            <div className="flex flex-1 justify-center">
                <div className="space-y-2">{routes.map((item) => (
                    <div onClick={()=>onNavigate(item.href,item.pro)} key={item.href} className={cn('text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition', pathname === item.href && "bg-primary/10 text-primary")}>
                        <div className="flex flex-col gap-y-2 items-center flex-1">
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </div>
                    </div>
                ))


                }</div>
            </div>
        </div>
    );
}

export default SideBar;