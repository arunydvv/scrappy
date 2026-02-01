import ToolTipWrapper from '@/components/ToolTipWrapper'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import SaveButton from './SaveButton'


const Topbar = ({ title, subtitle, workflowId }: {
    title: string,
    subtitle?: string,
    workflowId: string
}) => {
    const router = useRouter();
  return (
      <header className='flex p-2 border-b-2 border-separate justify-between w-full
      h-[60px] sticky top-0 bg-background z-10'>
          <div className='flex gap-1 flex-1'>
              <ToolTipWrapper content="Back" >
                  <Button variant="ghost" size="icon"
                      onClick={() => router.back()}>
                        <ArrowLeft className='w-5 h-5' />
                  </Button>
              </ToolTipWrapper>
              <div>
                  <p className='font-bold text-ellipsis truncate'>
                      {title || "Untitled Workflow"}
                  </p>
                  {
                      subtitle && (
                          <p className='text-xs text-muted-foreground truncate text-ellipsis  '>
                              {subtitle}
                          </p>
                      )
                  }
              </div>
          </div>
          <div className='flex gap-1 flex-1 justify-end '>
              <SaveButton workflowId={workflowId} />              
          </div>
          
    </header>
  )
}

export default Topbar