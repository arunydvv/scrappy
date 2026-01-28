"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TaskParams } from "@/types/tasks"
import React, { useId } from "react"
import { ParamProps } from "@/types/nodes"




const StringParamField = ({ params, value, updateNodeParamValue }: ParamProps) => {
    const id = useId()

    return (
        <div className="space-y-1.5 w-full">
            <Label htmlFor={id} className="text-xs text-muted-foreground">
                {params.name}
                {params.required && (
                    <span className="ml-1 text-red-400">*</span>
                )}
            </Label>

            <Input
                id={id}
                required={params.required}
                placeholder={params.placeholder ?? ""}
                
                className="text-sm"
            />
            {
                params.helperText && (
                    <p className="text-muted-foreground px-2">
                        {params.helperText}
                    </p>
                )
            }
        </div>
    )
}

export default StringParamField
