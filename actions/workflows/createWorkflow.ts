"use server";

import prisma from "@/lib/prisma";
import { CreateWorkflowInputSchema, createWorkflowSchema } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflowTypes";
import { auth } from "@clerk/nextjs/server";


export async function CreateWorkflow(form: CreateWorkflowInputSchema) {
    const { success, data } = createWorkflowSchema.safeParse(form);

    if (!success) {
        console.log("Invalid form data")
        throw new Error("Invalid form data");
    }

    const { userId } = auth();

    if (!userId) {
        console.log("Unauthenticated");
        throw new Error("Unauthenticated");
    }

    console.log('request going to db')

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: "TODO",
            ...data,
        },
    })

    if (!result) {
        console.log("Failed to create Workflow")
        throw new Error("Failed to create Workflow")
    }

    return { id: result.id };
}
