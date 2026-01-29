"use client"

import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { Workflow } from '@prisma/client'
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'

interface TopbarProps {
  title: string;
  subTitle: string;
}

const Editor = ({workflow} : {workflow : Workflow}) => {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col h-full w-full overflow-hidden'>
        <Topbar
          title={"Workflow Editor"}
          subtitle={workflow.name}
          workflowId={workflow.id}
        />
        <section className='flex flex-col h-full w-full overflow-hidden'>
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor