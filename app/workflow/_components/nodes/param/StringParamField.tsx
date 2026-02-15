"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { ReactElement, useId, useState } from "react"
import { ParamProps } from "@/types/nodes"
import { Textarea } from "@/components/ui/textarea"




const StringParamField = ({ params, value, updateNodeParamValue, disabled }: ParamProps) => {
    const [internalValue, setInternalValue] = useState(value);
    const id = useId()

    let Component: any = Input;
    if (params.variant === 'textarea') {
        Component = Textarea;
    }

    return (
        <div className="space-y-1 p-1 w-full">
            <Label htmlFor={id} className="text-xs flex">
                {params.name}
                {params.required && <p className="text-red-400 px-2">*</p>}
            </Label>
            <Component
                id={id}
                disabled={disabled}
                className="text-xs "
                value={internalValue}
                placeholder="Enter value here"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInternalValue(e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => updateNodeParamValue(e.target.value)}
            />
            {params.helperText && <p className="text-muted-foreground px-2">{params.helperText}</p>}
        </div>
    )
}

export default StringParamField
