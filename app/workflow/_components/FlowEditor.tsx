"use client"

import React, { useCallback } from "react"
import type { Workflow } from "@prisma/client"
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"
import { TaskType } from "@/types/task"
import createReactFlowNode from "@/lib/workflow/createReactFlowNode"
import NodeComponent from "./nodes/NodeComponent"

interface FlowEditorProps {
  workflow: Workflow
}

const NodeTypes = {
  LumaeNode : NodeComponent
}

const snapGrid: [number, number] = [1, 1];

const firViewOptions = {
  padding: 2
}


const FlowEditor = ({ workflow }: FlowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([
    createReactFlowNode(TaskType.LAUNCH_BROWSER)
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges]
  )



  return (
    <main className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={NodeTypes}
        snapGrid={snapGrid}
        fitViewOptions={firViewOptions}
        snapToGrid
        fitView
      >
        <Background gap={12} size={1} />
        <Controls position="top-left" fitViewOptions={firViewOptions}/>
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
