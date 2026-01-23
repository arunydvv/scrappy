import { z } from "zod"

export const createWorkflowSchema = z.object({
    name: z
        .string()
        .min(3, "Workflow name must be at least 3 characters"),
    description: z.
        string().
        min(1).
        optional().
        or(z.literal(""))
})

export type CreateWorkflowInputSchema = z.infer<typeof createWorkflowSchema>
