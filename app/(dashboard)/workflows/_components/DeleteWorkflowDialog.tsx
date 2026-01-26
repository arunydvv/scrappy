"use client"

import { deleteWorkflow } from "@/actions/workflows/deleteWorkflow"
import { deleteWorkflowClient } from "@/actions/workflows/deleteWorkflowClient"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

interface DeleteWorkflowDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName?: string;
    workflowId: string;
}

const DeleteWorkflowDialog = ({
    open,
    setOpen,
    workflowName,
    workflowId
}: DeleteWorkflowDialogProps) => {
    const [confirmText, setConfirmText] = useState("")


    const deleteMutation = useMutation({
        mutationFn: deleteWorkflowClient,
        onSuccess: () => {
            toast.success("Workflow deleted successfully", {
                id: workflowId
            })
        },
        onError: (e) => {
            console.log("Error deleting workflow", e)
            toast.error("Failed to delete workflow", {
                id: workflowId
            })
        } 
    })


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        workflow and you will not be able to recover it.
                        <div className="mt-3">
                            <p>
                                If you are sure, enter <b>{workflowName}</b> to confirm.
                            </p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <Input
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                    >
                    </Input>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={(confirmText !== workflowName) || deleteMutation.isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"

                        onClick={(e) => {
                            e.stopPropagation();
                            toast.loading("Deleted Workflow.....", {
                                id: workflowId
                            });
                            deleteMutation.mutate(workflowId)
                        }}
                        
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog

