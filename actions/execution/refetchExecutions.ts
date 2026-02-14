"use server";

import { getWorkflowExecutionWithPhases } from "./getWorkflowExecutionWithPhases";

export async function refetchExecution(executionId: string) {
    return getWorkflowExecutionWithPhases(executionId);
}
