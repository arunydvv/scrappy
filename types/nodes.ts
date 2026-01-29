import { Node } from "@xyflow/react";
import { TaskParams, TaskType } from "@/types/tasks";
import NodeComponent from "@/app/workflow/_components/nodes/NodeComponent";


export interface AppNodeData{
    type: TaskType;
    [key: string]: any;
    inputs: Record<string, string>;
}


export interface AppNode extends Node { 
    data: AppNodeData
}


export interface ParamProps{
    params: TaskParams,
    value?: string,
    updateNodeParamValue: (newValue: string) => void
}

export const NodeTypes = {
    LumaeNode: NodeComponent
}