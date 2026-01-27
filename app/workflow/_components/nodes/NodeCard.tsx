"use client";

import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';
import React from 'react'

export const NodeCard = ({ children, nodeId, isSelected }: {
    nodeId: string,
    children: React.ReactNode,
    isSelected: boolean
}) => {

    const { getNode } = useReactFlow();
    



    return (
        <div
            onDoubleClick={() => {

            }}
            className={cn('rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col',
                isSelected && "border-primary"
            )} >
            {children}
        </div>
    )
}