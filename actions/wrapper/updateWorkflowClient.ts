import { updateWorkflow } from "../workflows/updateWorkflow";


export async function updateWorkflowClient(
    input: { id: string; definition: string }) {
    return await updateWorkflow(input)
}