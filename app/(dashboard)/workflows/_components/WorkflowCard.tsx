import { Card, CardContent } from "@/components/ui/card";
import { Workflow } from "@/app/generated/prisma";
import { WorkflowStatus } from "@/types/workflowTypes";
import { FileTextIcon, PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = [
    {
        status: WorkflowStatus.DRAFT,
        bg: "bg-yellow-400",
        text: "text-yellow-700",
        Icon: FileTextIcon,
    },
    {
        status: WorkflowStatus.PUBLISHED,
        bg: "bg-primary",
        text: "text-primary-foreground",
        Icon: PlayIcon,
    },
];

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
    const config =
        statusConfig.find((c) => c.status === workflow.status) ??
        statusConfig[0]; // fallback to DRAFT

    return (
        <Card className="border border-separate rounded-lg overflow-hidden shadow-sm hover:shadow-md dark:shadow-primary/30">
            <CardContent className="p-4 flex items-center gap-4 h-[100px]">
                <div
                    className={cn(
                        "flex w-10 h-10 items-center justify-center rounded-full",
                        config.bg
                    )}
                >
                    <config.Icon className={cn("h-5 w-5", config.text)} />
                </div>

                <div className="flex flex-col gap-1 overflow-hidden">
                    <p className="font-semibold truncate">{workflow.name}</p>
                    {workflow.description && (
                        <p className="text-sm text-muted-foreground truncate">
                            {workflow.description}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default WorkflowCard;
