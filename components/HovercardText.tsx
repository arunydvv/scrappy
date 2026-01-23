import React from "react"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

type HoverCardSide = "top" | "right" | "bottom" | "left"

const HovercardText = ({
    text,
    textMessage,
    side = "right",
}: {
    text: string
    textMessage?: string
    side?: HoverCardSide
}) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <span className="inline-flex items-center justify-center px-1 cursor-help">
                    {text}
                </span>
            </HoverCardTrigger>

            <HoverCardContent side={side}>
                {textMessage}
            </HoverCardContent>
        </HoverCard>
    )
}


export default HovercardText
