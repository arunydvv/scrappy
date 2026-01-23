import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from 'react'
import { Separator } from "./ui/separator";

interface dialogHeaderProps {
    title?: string,
    subTitle?: string,
    icon?: LucideIcon;

    iconClassName?: string,
    titleClassName?: string,
    subtitleClassName?: string,
}


function CustomDialogHeader(props: dialogHeaderProps) {

    return (
        <DialogHeader>
            <DialogTitle asChild>
                <div className="flex flex-col items-center gap-2">
                    {props.icon && (
                            <props.icon
                                size={30}
                                className={cn("stroke primary", props.iconClassName)}
                        />)}
                    
                    {props.title && (
                            <p className={cn("text-xl text-primary", props.titleClassName)}>
                                {props.title}
                        </p>)}
                    
                    {props.subTitle && (
                            <p className={cn("text-sm text-muted-foreground", props.subtitleClassName)}>
                                {props.subTitle}
                            </p>)}

                </div>


            </DialogTitle>
            <Separator />

        </DialogHeader>
    )
}

export default CustomDialogHeader