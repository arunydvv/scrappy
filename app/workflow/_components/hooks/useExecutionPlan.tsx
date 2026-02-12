import { FlowToExecutionPlan } from "@/lib/workflow/execution/executionPlan";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { AppNode } from "@/types/nodes";


const useExecutionPlan = () => {
    const { toObject } = useReactFlow();
    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject();
        const result = FlowToExecutionPlan(nodes as AppNode[], edges);
        
        
    }, [toObject]);
    return generateExecutionPlan;
};

export default useExecutionPlan