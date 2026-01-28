import { TaskParams, TaskParamsType } from '@/types/tasks'
import React, { useCallback } from 'react'
import StringParamField from './param/StringParamField'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/nodes'

const NodeParamField = ({ param, nodeId }: {
    param: TaskParams,
    nodeId: string
}) => {
    
    const { updateNodeData, getNode } = useReactFlow();
    const node = getNode(nodeId) as AppNode;

    const value = node?.data.inputs?.[param.name];
    console.log("@VALUE", value)

    const updateNodeParamValue = useCallback((newValue: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [param.name] : newValue
            }
        })
        
    },[nodeId, updateNodeData, param.name, node?.data.inputs])


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