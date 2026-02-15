import prisma from "@/lib/prisma"
import { exec } from "child_process";
import { revalidatePath } from "next/cache";
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
    // TODO: INIT WORKFLOW EXEC
    // TODO: INIT PHASE SETUP

    let executionFailed = false;

    for (const phase of execution.phases) {
        //TODO : EXECUTE PHASES
    }


    //TODO: FINALISE EXEC
    //TODO: CLEANUP ENVIRONMENT


    revalidatePath("workflow/runs")









    


    
}