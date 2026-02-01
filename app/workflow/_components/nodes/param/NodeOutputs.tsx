import { Handle } from '@xyflow/react'
import React from 'react'
import { Position } from '@xyflow/react'
import { cn } from '@/lib/utils'
import { TaskParams } from '@/types/tasks'
import { ColorForHandle } from '../common'

const NodeOutputs = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col divide-y gap-1'>
      {children}
    </div>
  )
}

export const NodeOutput = ({output}: {output: TaskParams}) => {
    return (
      <div className='flex justify-end relative p-3 bg-secondary'>
        <p className='text-xs text-muted-foreground'>
          {output.name}
        </p>
        <Handle
          id={output.name}
          type="source"
          position={Position.Right}
          className={cn("!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4 ",
            output.optional && "opacity-50",
            ColorForHandle[output.type]
           )}
        >
        </Handle>

      </div>
    )
}

export default NodeOutputs
