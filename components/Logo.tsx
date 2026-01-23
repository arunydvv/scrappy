import { cn } from "@/lib/utils";
import { Pickaxe } from "lucide-react";
import Link from "next/link";
import React from "react";


interface LogoProps {
    fontSize?: string;
    iconSize?: number;
}

function Logo({
    fontSize = "text-2xl",
    iconSize = 20,
}: LogoProps) {
    return (
        <Link
            href='/'            
            className={cn('text-2xl font-extrabold flex items-center gap-2 ')} >
            <div className="rounded-xl bg-gradient-to-r from-primary to-ring p-2">
                <Pickaxe size={iconSize} className="stroke-primary-foreground" />
            </div>

            <div>
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                    
                </span>
                <span className="text-stone-700 dark:text-stone-300">
                    Scrappy
                </span>

            </div>
        
        </Link>
    );
}

export default Logo;
