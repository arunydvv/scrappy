"use client"

import React, { useCallback, useEffect } from "react"
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
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"
import { AppNode, NodeTypes } from "@/types/nodes"
import { snapGrid } from "@/constant/reactFlow"
import createReactFlowNode from "@/lib/workflow/createReactFlowNode"
import { TaskType } from "@/types/tasks"

const FlowEditorInner = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { setViewport, setCenter, screenToFlowPosition } = useReactFlow()

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = createReactFlowNode(taskType as TaskType, position);
    setNodes((nds) => nds.concat(newNode));
    

  }, [])







  useEffect(() => {
    if (!workflow.definition) {
      setNodes([createReactFlowNode(TaskType.LAUNCH_BROWSER, { x: 0, y: 0 })])
      setEdges([])

      requestAnimationFrame(() => {
        setCenter(0, 0)
      })
      return
    }

    try {
      const parsed = JSON.parse(workflow.definition)

      setNodes(parsed.nodes ?? [])
      setEdges(parsed.edges ?? [])

      if (parsed.viewport) {
        const { x = 0, y = 0, zoom = 1 } = parsed.viewport
        requestAnimationFrame(() => {
          // setViewport({ x, y, zoom })
        })
      }
    } catch (err) {
      console.error("Invalid workflow definition:", err)
    }
  }, [workflow.definition])


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={NodeTypes}
      snapGrid={snapGrid}
      minZoom={0.2}
      maxZoom={2}
      snapToGrid
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Background gap={12} size={1} />
      <Controls position="top-left" />
    </ReactFlow>
  )
}

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <main className="w-full h-screen">
        <FlowEditorInner workflow={workflow} />
    </main>
  )
}

export default FlowEditor
