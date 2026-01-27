import React, { memo } from 'react'
import { NodeProps } from "@xyflow/react"
import {NodeCard} from './NodeCard'


const NodeComponent = memo((props: NodeProps) => {
    return (
        <NodeCard nodeId={props.id} isSelected={props.selected}> Enter website URL </NodeCard>
    )
})

NodeComponent.displayName = "NodeComponent"
export default NodeComponent
