import { AppNode } from '@/types/nodes';
import { TaskType } from '@/types/tasks'

const createReactFlowNode = (
    nodeType: TaskType,
    position?: { x: number; y: number },  

): AppNode => {
    return {
        id: crypto.randomUUID(),
        type: "LumaeNode",
        dragHandle: ".drag-handle",
        data: {
            type: nodeType,
            inputs: {},
        },
        position: position ?? { x: 0, y: 0 }
    };
}

export default createReactFlowNode