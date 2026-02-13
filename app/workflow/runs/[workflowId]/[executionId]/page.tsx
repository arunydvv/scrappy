
import Topbar from '@/app/workflow/_components/topbar/Topbar';
import React from 'react'

export default function ExecutionViewer({ params }: {
    params: {
        executionId: string;
        workflowId: string;
    }
}){
  
  return (
      <div className='flex flex-col h-screen w-full overflow-hidden'>
          {/* <Topbar workflowId={params.workflowId}
              title="Workflow run details"
              subtitle={`Run ID: ${params.executionId}`}
          /> */}


          
    </div>
  )
}

