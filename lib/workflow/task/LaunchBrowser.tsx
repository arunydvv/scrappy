import { TaskParamsType, TaskType } from "@/types/task";
import {  Compass, GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch Browser",
    icon: (props: LucideProps) => (
        <Compass className="stroke-pink-600 " {...props}  />
    ),
    isEntryPoint: true,
    inputs: [
        {
            name: "Website URL",
            label: "Website URL",
            type: TaskParamsType.STRING,
            defaultValue: "https://www.google.com",
            required: true,
            hideHandle: true,
            helperText: "e.g: https://www.google.com"
        }
    ]
}

