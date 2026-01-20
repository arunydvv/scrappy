"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MobileSidebar } from "./Sidebar";

function BreadcrumbHeader() {
    const pathname = usePathname();

    const segments = pathname
        .split("/")
        .filter(Boolean); // removes empty strings

    return (
        <div className="flex items-center justify-start">
            <MobileSidebar/>
            <Breadcrumb>
                <BreadcrumbList>
                    {/* Home */}
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {segments.map((segment, index) => {
                        const href = "/" + segments.slice(0, index + 1).join("/");
                        const isLast = index === segments.length - 1;

                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="capitalize">
                                            {segment.replace(/-/g, " ")}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            href={href}
                                            className="capitalize"
                                        >
                                            {segment.replace(/-/g, " ")}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbHeader;
