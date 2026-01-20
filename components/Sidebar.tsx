"use client";

import {
    CoinsIcon,
    HomeIcon,
    Layers2Icon,
    MenuIcon,
    ShieldCheckIcon,
} from "lucide-react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";


const routes = [
    {
        href: "/",
        label: "Home",
        icon: HomeIcon,
    },
    {
        href: "/workflows",
        label: "Workflows",
        icon: Layers2Icon,
    },
    {
        href: "/credentials",
        label: "Credentials",
        icon: ShieldCheckIcon,
    },
    {
        href: "/billing",
        label: "Billing",
        icon: CoinsIcon,
    },
];

function DesktopSidebar() {
    const pathname = usePathname();

    const activeRoute = routes
        .filter((route) => pathname.startsWith(route.href))
        .sort((a, b) => b.href.length - a.href.length)[0];

    return (
        <div className="hidden md:block min-w-[280px] max-w-[280px] h-screen border-r bg-primary/5 dark:bg-secondary/30">
            <div className="flex items-center justify-center gap-2 border-b p-4">
                <Logo />
            </div>

            <div className="flex flex-col p-2 gap-1">
                {routes.map((route) => {
                    const isActive = activeRoute?.href === route.href;

                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={buttonVariants({
                                variant: isActive ? "sidebarActiveItem" : "sidebarItem",
                                className: "justify-start gap-2",
                            })}
                        >
                            <route.icon size={20} />
                            {route.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export function MobileSidebar() {
    const [isOpen, setOpen] = useState(false);
    const pathname = usePathname();

    const activeRoute = routes
        .filter((route) => pathname.startsWith(route.href))
        .sort((a, b) => b.href.length - a.href.length)[0];

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        className="w-[400px] sm:w-[540px] space-y-4"
                        side={"left"}
                    >
                        <SheetHeader>
                            <SheetTitle><Logo/></SheetTitle>
                            <SheetDescription>
                                <div className="flex flex-col mt-4 gap-2">
                                    {routes.map((route) => {
                                        const isActive = activeRoute?.href === route.href;

                                        return (
                                            <Link
                                                key={route.href}
                                                href={route.href}
                                                className={buttonVariants({
                                                    variant: isActive ? "sidebarActiveItem" : "sidebarItem",
                                                    className: "justify-start gap-2",
                                                })}
                                            >
                                                <route.icon size={20} />
                                                {route.label}
                                            </Link>
                                        );
                                    })}

                                </div>

                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default DesktopSidebar;
