"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Workflow } from "@/node_modules/.prisma/client";

import { WorkflowStatus } from "@/types/workflowTypes";
import { Delete, FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ToolTipWrapper from "@/components/ToolTipWrapper";
import { useState } from "react";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";
import { set } from "zod";



const statusColors = {
    [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
    [WorkflowStatus.PUBLISHED]: "bg-primary text-white",
};

interface WorkflowCardProps {
    workflow: Workflow;
}

const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
    const isDraft = workflow.status === WorkflowStatus.DRAFT;

    return (
        <Card className="border border-separate rounded-lg overflow-hidden shadow-sm hover:shadow-md dark:shadow-primary/30">
            <CardContent className="p-4 flex items-center justify-between gap-4 h-[100px]">
                {/* Left section */}
                <div className="flex items-center space-x-3">
                    <div
                        className={cn(
                            "flex w-10 h-10 items-center justify-center rounded-full",
                            statusColors[workflow.status as WorkflowStatus]
                        )}
                    >
                        {isDraft ? (
                            <FileTextIcon className="h-5 w-5 text-yellow-700" />
                        ) : (
                            <PlayIcon className="h-5 w-5 text-white" />
                        )}
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-muted-foreground flex items-center">
                            <Link
                                href={`/workflow/editor/${workflow.id}`}
                                className="hover:underline"
                            >
                                {workflow.name}
                            </Link>

                            {isDraft && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    Draft
                                </span>
                            )}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 ">
                    {/* Right section */}
                    <Link
                        href={`/workflow/editor/${workflow.id}`}
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "sm",
                            }),
                            "flex items-center gap-2"
                        )}
                    >
                        <ShuffleIcon className="h-4 w-4" />
                        Edit
                    </Link>
                    <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
                </div>
            </CardContent>
        </Card>
    );
};


function WorkflowActions({
    workflowName,
    workflowId,
}: {
    workflowName?: string
    workflowId: string
}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    return (
        <>
            <DeleteWorkflowDialog
                open={showDeleteDialog}
                setOpen={setShowDeleteDialog}
                workflowName={workflowName}
                workflowId={workflowId}
            />

            <DropdownMenu>
                <ToolTipWrapper content="More actions" size="top">
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <MoreVerticalIcon size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                </ToolTipWrapper>

                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive flex items-center gap-2"
                            onSelect={() => setShowDeleteDialog(true)}
                        >
                            <TrashIcon size={16} />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

                  
export default WorkflowCard;
