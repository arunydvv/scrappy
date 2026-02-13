import { cn } from "@/lib/utils";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/components/hooks/useFlowValidation";


const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col divide-y gap-1">
      {children}
    </div>
  );
};

export const NodeInput = ({ input, nodeId, }: {
  input: any;
  nodeId: string;
}) => {

  const { invalidInputs } = useFlowValidation();

  const edges = useEdges();
  const isConnected = edges.some((edge) => edge.target === nodeId && edge.targetHandle === input.name);

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);


  return (
    <div className={cn("flex justify-start relative p-3 bg-secondary w-full",
      hasErrors && 'bg-destructive/30'
    )}>
      {/* LEFT HANDLE */}
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />

      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            input.optional && "opacity-50",
            ColorForHandle[input.type as keyof typeof ColorForHandle]
          )}
        />
      )}

    </div>
  );
};

export default NodeInputs;
