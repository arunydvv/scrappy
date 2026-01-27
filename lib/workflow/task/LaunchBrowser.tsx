import { cn } from "@/lib/utils";
import { TaskType } from "@/types/task";
import { GlobeIcon, LucideIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch Browser",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-pink-600 " {...props}  />
    ),
    isEntryPoint: true
}

