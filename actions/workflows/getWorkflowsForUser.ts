"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";


export const getWorkflowsForUser = cache(async () => {
    const { userId } = auth();

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
})
