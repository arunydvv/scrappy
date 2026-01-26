"use client";

import React from 'react'

import { Button } from "@/components/ui/button"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface ToolTipWrapperProps {
    children: React.ReactNode;
    content: React.ReactNode;
    size?: "top" | "right" | "bottom" | "left";
}

const ToolTipWrapper = ({ children, content, size = "top" }: ToolTipWrapperProps) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={size}>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}


export default ToolTipWrapper