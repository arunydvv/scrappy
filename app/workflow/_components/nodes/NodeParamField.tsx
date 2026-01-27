import { TaskParams, TaskParamsType } from '@/types/task'
import React from 'react'
import StringParamField from './param/StringParamField'
import { useReactFlow } from '@xyflow/react'

const NodeParamField = ({ param }: { param: TaskParams }) => {
    const { updateNodeData } = useReactFlow();
    switch (param.type) {
        case TaskParamsType.STRING:
            return <StringParamField params={param} />
        default:
            return (
                <div className='w-full'>
                    <p className='text-xs text-muted-foreground '>
                        Not implemented
                    </p>
                </div>
            )
    }
            
}

export default NodeParamField