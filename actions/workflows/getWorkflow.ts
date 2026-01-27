import prisma from "@/lib/prisma"

export async function getWorkflow(
    workflowId: string,
    userId: string
) {
    return await prisma.workflow.findFirst({
        where: {
            id: workflowId,
            userId: userId,
        },
    })
}
