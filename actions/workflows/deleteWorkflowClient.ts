import { deleteWorkflow } from "./deleteWorkflow";

export async function deleteWorkflowClient(id: string) {
    return await deleteWorkflow(id)
}
