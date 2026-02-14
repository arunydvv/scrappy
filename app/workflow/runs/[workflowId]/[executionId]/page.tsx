
import { getWorkflowExecutionWithPhases } from '@/actions/execution/getWorkflowExecutionWithPhases';
import Topbar from '@/app/workflow/_components/topbar/Topbar';
import { auth } from '@clerk/nextjs/server';
import { Loader2Icon } from 'lucide-react';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import ExecutionViewer from './_components/ExecutionViewer';

export default async function page({ params }: {
    params: {
        executionId: string;
        workflowId: string;
    }
}){
  
  return (
      <div className='flex flex-col h-screen w-full overflow-hidden'>
          <Topbar workflowId={params.workflowId}
              title="Workflow run details"
              subtitle={`Run ID: ${params.executionId}`}
              hideButtons={true}
          />

          <section className='flex h-full overflow-auto'>
              <Suspense
                  fallback={
                      <div className='flex w-full items-center justify-center'>
                          <Loader2Icon className='h-10 w-10 animate-spin'/>
                      </div>
              }>
                  <ExecutionViewerWrapper executionId={params.executionId} />
              </Suspense>
          </section>

    </div>
  )
}


async function ExecutionViewerWrapper({ executionId, }: {
    executionId: string
}) {
    
    const { userId } = auth();
    if (!userId) {
        return <div>Unauthenticated</div>
    }

    const workflowExecution = await getWorkflowExecutionWithPhases(executionId);
    if (!workflowExecution) {
        notFound()
    }


    return (
        <ExecutionViewer initialData ={workflowExecution} />
    )
}