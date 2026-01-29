"use server"

import prisma from "@/lib/prisma"
import { WorkflowStatus } from "@/types/workflowTypes"
import { auth } from "@clerk/nextjs/server"

type UpdateWorkflowInput = {
    id: string
    definition: string
}

export async function updateWorkflow({ id, definition }: UpdateWorkflowInput) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    if (!id || typeof definition !== "string") {
        throw new Error("Invalid input")
    }

    JSON.parse(definition)
    console.log()

    const workflow = await prisma.workflow.findUnique({
        where: { id },
        select: { id: true, status: true, userId: true },
    })

    if (!workflow || workflow.userId !== userId) {
        throw new Error("Workflow not found")
    }

    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("Only draft workflows can be updated")
    }

    await prisma.workflow.update({
        where: { id },
        data: {
            definition,
            updatedAt: new Date(),
        },
    })


    return { success: true }
}
