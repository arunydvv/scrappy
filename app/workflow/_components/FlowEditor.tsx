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
  getOutgoers,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"
import { AppNode, NodeTypes } from "@/types/nodes"
import {EdgeTypes } from "@/types/edges"
import { snapGrid } from "@/constant/reactFlow"
import createReactFlowNode from "@/lib/workflow/createReactFlowNode"
import { TaskType } from "@/types/tasks"
import { TaskRegistry } from "@/lib/workflow/task/registry"


const FlowEditorInner = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { setViewport, setCenter, screenToFlowPosition, updateNodeData } = useReactFlow()
  


  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true, type: "custom"}, eds));
      if (!connection.targetHandle) return;

      // Remove input value if it is present on connection
      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;

      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: '',
        },
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (!taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = createReactFlowNode(taskType as TaskType, position);
    setNodes((nds) => nds.concat(newNode));
    

  }, [screenToFlowPosition, setNodes])

  const isValidConnection = useCallback((connection: Connection | Edge) => {
    //No self connection allowed
    if (connection.source == connection.target) {
      return false;
    }

    //only same type handles can be connected (same taskParam)
    const sourceNode = nodes.find((node) => node.id === connection.source)
    const targetNode = nodes.find((node) => node.id === connection.target)
    if (!sourceNode || !targetNode) {
      console.log("Invalid Connection: Source or target node not found");
      return false;
    }

    const sourceTask = TaskRegistry[sourceNode.data.type]
    const targetTask = TaskRegistry[targetNode.data.type]

    if (!sourceTask || !targetTask) {
      console.log("Invalid Connection: Source or target task not found");
      return false;
    }

    const output = sourceTask.outputs.find((out) => out.name === connection.sourceHandle)
    const input = targetTask.inputs.find((inp) => inp.name === connection.targetHandle)
    console.log({
      input, output
    })


    // Cycle connection not allowed
    const hasCycle = (node: AppNode, visited = new Set()) => {
      if (visited.has(node.id)) return false;
      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };

    const detectedCycle = hasCycle(targetNode);

    return !detectedCycle;

  }, [nodes, edges])




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
      deleteKeyCode={["Delete"]}
      edgeTypes={EdgeTypes}
      snapGrid={snapGrid}
      minZoom={0.2}
      maxZoom={2}
      snapToGrid
      onDragOver={onDragOver}
      onDrop={onDrop}
      isValidConnection={isValidConnection}
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
