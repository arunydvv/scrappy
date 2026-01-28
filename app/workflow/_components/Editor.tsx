"use client"

import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { Workflow } from '@prisma/client'
import FlowEditor from './FlowEditor'



const Editor = ({workflow} : {workflow : Workflow}) => {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col h-full w-full overflow-hidden'>
        <section className='flex flex-col h-full w-full overflow-hidden'>
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor