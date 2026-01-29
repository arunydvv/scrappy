import React, { memo } from 'react'
import { NodeProps } from "@xyflow/react"
import { NodeCard } from './NodeCard'
import NodeHeader from './NodeHeader'
import { AppNodeData } from '@/types/nodes'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import NodeInputs, { NodeInput } from './NodeInputs'


const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData; // Data of the Node
    const task = TaskRegistry[nodeData.type];   // LaunchBrowser etc
    
    return (
        <NodeCard nodeId={props.id} isSelected={props.selected}>
            <NodeHeader
            taskType={nodeData.type}    
            />
            <NodeInputs>
                {task.inputs.map(input => (
                    <NodeInput
                        key={input.name}
                        input={input}
                        nodeId={props.id}
                    />
                ))}
            </NodeInputs>
        </NodeCard>
    )
})

NodeComponent.displayName = "NodeComponent"
export default NodeComponent
