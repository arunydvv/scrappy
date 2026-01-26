import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

interface PageProps {
    params: {
        workflowId: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { workflowId } = params

    const { userId } = auth()
    if (!userId) {
        notFound()
    }

    const workflow = await prisma.workflow.findFirst({
        where: {
            id: workflowId,
            userId,
        },
    })

    if (!workflow) {
        notFound()
    }

    return (
        <div>
            <pre className="h-screen">
        {JSON.stringify(workflow, null, 2)}
            </pre>
        </div>
    )
}

export default Page
