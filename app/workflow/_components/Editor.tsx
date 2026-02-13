"use client"

import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { Workflow } from '@prisma/client'
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'
import TaskMenu from './TaskMenu'
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext'

interface TopbarProps {
  title: string;
  subTitle: string;
}

const Editor = ({workflow} : {workflow : Workflow}) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className='flex flex-col h-full w-full overflow-hidden'>
          <Topbar
            title={"Workflow Editor"}
            subtitle={workflow.name}
            workflowId={workflow.id}
          />

          <section className='flex h-full w-full overflow-hidden'>
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  )
}

export default Editor