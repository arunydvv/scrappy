import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

// import useFlowValidation from '@/hooks/use-flow-validation';
import { FlowToExecutionPlan, } from '@/lib/workflow/execution/executionPlan';
import { AppNode } from '@/types/nodes';
import { FlowToExecutionPlanValidationError } from '@/types/errors';
import useFlowValidation from './useFlowValidation';

const useExecutionPlan = () => {
    const { toObject } = useReactFlow();
    const { setInvalidInputs, clearErrors } = useFlowValidation();

    const handleError = useCallback(
        (error: any) => {
            switch (error?.type) {
                case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
                    toast.error(
                        "Execution cannot start: no entry point node found. Please add a start node."
                    );
                    break;

                case FlowToExecutionPlanValidationError.INVALID_INPUTS:
                    toast.error(
                        "Execution blocked: required input values are missing. Please complete all inputs."
                    );
                    setInvalidInputs(error.invalidElements);
                    break;

                default:
                    toast.error(
                        "Execution failed due to an unexpected error. Please try again."
                    );
                    break;
            }
        },
        [setInvalidInputs]
    );


    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject();
        const { executionPlan, error } = FlowToExecutionPlan(nodes as AppNode[], edges);
        console.log({
            executionPlan
        })

        if (error) {
            handleError(error);
            return null;
        }

        clearErrors();

        return executionPlan;
    }, [toObject, handleError, clearErrors]);

    return generateExecutionPlan;
};

export default useExecutionPlan;