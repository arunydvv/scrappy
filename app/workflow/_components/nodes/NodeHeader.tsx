'use client';

import { useReactFlow } from '@xyflow/react';
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { TaskRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/tasks';

import { AppNode } from '@/types/nodes';
import createReactFlowNode from '@/lib/workflow/createReactFlowNode';

export default function NodeHeader({ taskType, nodeId }: { taskType: TaskType; nodeId: string }) {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();

  return (
    <div className="flex items-center gap-2 p-2 drag-handle border-b bg-muted/40 rounded-t-md">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16}  />
            {task.credits} 
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  deleteElements({ nodes: [{ id: nodeId }] });
                }}
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const newX = node.position.x + 1;
                  const newY = node.position.y + 1;
                  const newNode = createReactFlowNode(node.data.type, { x: newX, y: newY + node.measured?.height! + 20 });
                  addNodes([newNode]);
                }}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className=" cursor-grab active:cursor-grabbing">  {
            //drag-handle}
          }
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}