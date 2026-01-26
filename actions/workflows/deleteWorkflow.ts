"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";



export async function deleteWorkflow(id: string) {
    const { userId } = auth();
    console.log("Deleting workflow with id:", id, "for user:", userId);
    if (!userId) {
        throw new Error("Unauthorized");
    }
    

    await prisma.workflow.delete({
        where: {
            id,
            userId,
        }
    });

    revalidatePath("/workflows");
}