import React, { memo } from 'react'
import { NodeProps } from "@xyflow/react"
import { NodeCard } from './NodeCard'
import NodeHeader from './NodeHeader'
import { AppNodeData } from '@/types/nodes'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import NodeInputs, { NodeInput } from './NodeInputs'
import NodeOutputs, { NodeOutput } from './param/NodeOutputs'
import { Badge } from '@/components/ui/badge'

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true"

const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData; // Data of the Node
    const task = TaskRegistry[nodeData.type];   // LaunchBrowser etc
    
    return (
        <NodeCard nodeId={props.id} isSelected={props.selected}>



            {/* -------------------------- NODE ID BADGE -------------------------- */ }
            {DEV_MODE && <Badge>
                {
                    (`Node id--->   ${props.id}`)
              }
            </Badge>}






            {/* /* -------------------------- NODE HEADER --------------------------  */}
            <NodeHeader
                taskType={nodeData.type}   
                nodeId={props.id}    
            />




            {/*  -------------------------- NODE INPUT --------------------------  */}
            <NodeInputs>
                {task.inputs.map(input => (
                    <NodeInput
                        key={input.name}
                        input={input}
                        nodeId={props.id}
                    />
                ))}
            </NodeInputs>




            {/*  -------------------------- NODE OUTPUT --------------------------  */}
            <NodeOutputs>
                {task.outputs.map((output) => (
                    <NodeOutput key={output.name} output={output} />
                ))}
            </NodeOutputs>

            


        </NodeCard>
    )
})

NodeComponent.displayName = "NodeComponent"
export default NodeComponent
