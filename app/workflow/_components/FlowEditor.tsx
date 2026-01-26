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

interface FlowEditorProps {
  workflow: Workflow
}

const FlowEditor = ({ workflow }: FlowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([{
    id: "node-1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },  
  }])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges]
  )

  const handleAddNode = useCallback(() => {
    setNodes((nds) => {
      const nextId = `node-${nds.length + 1}`

      return [
        ...nds,
        {
          id: nextId,
          position: {
            x: 100 + nds.length * 40,
            y: 100 + nds.length * 80,
          },
          data: { label: `Node ${nds.length + 1}` },
          type: "default",
        },
      ]
    })
  }, [setNodes])

  return (
    <main className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background gap={12} size={1} />
        <Controls position="top-left" />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
