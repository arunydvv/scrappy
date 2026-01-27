import { AppNode } from '@/types/appNode';
import { TaskType } from '@/types/task'
import React from 'react'

const createReactFlowNode = (
    nodeType: TaskType,
    position?: { x: number; y: number },

): AppNode => {
      return {
          id: crypto.randomUUID(),
          type:"Node",
        data: {
            type: nodeType,
            inputs: {},
        },
        position: position ?? { x: 0, y: 0 }
    };
}

export default createReactFlowNode