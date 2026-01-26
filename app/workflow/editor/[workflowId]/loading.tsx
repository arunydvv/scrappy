import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const Loading = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Spinner  size={18}/>
        </div>
    )
}

export default Loading

function Spinner({
    className,
    ...props
}: React.ComponentProps<typeof LoaderIcon>) {
    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn(
                "h-6 w-6 animate-spin text-muted-foreground ",
                className
            )}
            {...props}
        />
    )
}
