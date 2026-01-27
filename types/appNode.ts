import { Node } from "@xyflow/react";
import { TaskParams, TaskType } from "@/types/task";


export interface AppNodeData{
    type: TaskType;
    [key: string]: any;
    inputs: Record<string, string>;
}


export interface AppNode extends Node { 
    data: AppNodeData
}

export interface ParamProps{
    param: TaskParams;
}