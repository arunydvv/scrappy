"use server";

import prisma from "@/lib/prisma";
import createReactFlowNode from "@/lib/workflow/createReactFlowNode";
import { CreateWorkflowInputSchema, createWorkflowSchema } from "@/schema/workflow";
import { AppNode } from "@/types/nodes";
import { TaskType } from "@/types/tasks";
import { WorkflowStatus } from "@/types/workflowTypes";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";

export async function CreateWorkflow(form: CreateWorkflowInputSchema) {
    const parsed = createWorkflowSchema.safeParse(form);

    if (!parsed.success) {
        throw new Error("Invalid form data");
    }

    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthenticated");
    }

    const initialFlow: {
        nodes: AppNode[];
        edges: Edge[]
    } = {
        nodes: [],
        edges: []
    }


    initialFlow.nodes.push(createReactFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...parsed.data,
        },
    });

    return { id: result.id };
}
