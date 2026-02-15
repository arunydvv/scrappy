import prisma from "@/lib/prisma"
import { WorkflowExecutionStatus } from "@/types/workflowTypes";
import { exec } from "child_process";
import { AnyTxtRecord } from "dns";
import { revalidatePath } from "next/cache";
import { initialize } from "next/dist/server/lib/render-server";
import "server-only"

export async function executeWorkflow(executionId: string) {
    const execution = await prisma.workflowExecution.findUnique({
        where: {
            id: executionId,
        },
        include: {
            workflow: true,
            phases: true
        }
    })

    if (!execution) {
        throw new Error("Exceution not found")
    }


    // TODO: SETUP EXECUTION ENGINE/ ENVIRONMENT
    const environment = {
        phases: {
        
        }
    }
    
    // TODO: INIT WORKFLOW EXEC
    await initializeWorkflowExecution(executionId, execution.workflowId);
    // TODO: INIT PHASE STATUS
    await initializePhaseStatus(execution);




    let executionFailed = false;
    for (const phase of execution.phases) {
        //TODO : EXECUTE PHASES
    }


    //TODO: FINALISE EXEC
    //TODO: CLEANUP ENVIRONMENT


    revalidatePath("workflow/runs")
}









/**
 * Initializes a workflow execution run.
 *
 * Marks the execution as RUNNING and records the start time.
 * Also updates the parent workflow with the latest run metadata
 * to reflect the active execution state.
 *
 * @param executionId - Unique ID of the workflow execution instance
 * @param workflowId - ID of the workflow being executed
 *
 * @returns Promise<void>
 */
async function initializeWorkflowExecution(executionId: string, workflowId: string) {
    await prisma.workflowExecution.update({
        where: {
            id: executionId
        },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING
        }
    })


    await prisma.workflow.update({
        where: {
            id: workflowId,
        },
        data: {
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId
        }
    })
    
}






/**
 * Resets all phases of an execution to the PENDING state.
 *
 * This prepares the execution pipeline before phase processing begins,
 * ensuring each phase starts from a consistent initial status.
 *
 * @param execution - Workflow execution object containing phase metadata
 *
 * @returns Promise<void>
 *
 * @remarks
 * - Expects `execution.phases` to contain valid phase IDs.
 * - Typically called immediately after execution initialization.
 * - Uses bulk update for efficiency.
 */
async function initializePhaseStatus(execution: any) {
    await prisma.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase: any) => phase.id)
            }
        },
        data: {
            status: WorkflowExecutionStatus.PENDING,
        }
    })

}