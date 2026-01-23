"use server";

import prisma from "@/lib/prisma";
import { CreateWorkflowInputSchema, createWorkflowSchema } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflowTypes";
import { auth } from "@clerk/nextjs/server";

export async function CreateWorkflow(form: CreateWorkflowInputSchema) {
    const parsed = createWorkflowSchema.safeParse(form);

    if (!parsed.success) {
        throw new Error("Invalid form data");
    }

    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthenticated");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: "TODO",
            ...parsed.data,
        },
    });

    return { id: result.id };
}
