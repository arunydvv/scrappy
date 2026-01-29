import { TaskParamsType, TaskType } from "@/types/tasks";
import { CodeIcon, Compass, FileCode, GlobeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get HTML from Page",
    icon: (props: LucideProps) => (
        <FileCode className="stroke-pink-600 " {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true,
        }
    ]
}

