"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getWorkflowsForUser() {
    const { userId } = auth();
    console.log("Hello1")

    if (!userId) {
        throw new Error("Unauthenticated");
        console.log("Hello")
    }

    return prisma.workflow.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}
