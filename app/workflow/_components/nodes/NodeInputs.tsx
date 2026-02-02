import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";

const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col divide-y gap-1">
      {children}
    </div>
  );
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: any;
  nodeId: string;
}) => {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      {/* LEFT HANDLE */}
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            input.optional && "opacity-50",
            ColorForHandle[input.type as keyof typeof ColorForHandle]
          )}
        />
      )}

      {/* INPUT FIELD */}
      <NodeParamField param={input} nodeId={nodeId} />
    </div>
  );
};

export default NodeInputs;
