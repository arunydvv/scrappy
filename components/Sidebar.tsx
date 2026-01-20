"use client";

import {
    CoinsIcon,
    HomeIcon,
    Layers2Icon,
    ShieldCheckIcon,
} from "lucide-react";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
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

export default DesktopSidebar;
