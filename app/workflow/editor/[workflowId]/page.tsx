import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import Editor from "../../_components/Editor"
import { getWorkflow } from "@/actions/workflows/getWorkflow"


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
    // await waitFor(1000)

    const workflow = await getWorkflow(workflowId, userId)
    
    if (!workflow) {
        notFound()
    }

    return ( 
        <Editor workflow={workflow} />
)
                        
}

export default Page
