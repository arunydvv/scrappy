import { waitFor } from "@/lib/helper/waitFor"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import Editor from "../../_components/Editor"

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

    await waitFor(2000)

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
        <Editor workflow={workflow}> 
                        
        </Editor>
    )
}

export default Page
