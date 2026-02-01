"use client";

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import React from 'react'
import { toast } from 'sonner'
import { Loader2, CheckIcon, RefreshCw } from "lucide-react"
import { updateWorkflowClient } from '@/actions/wrapper/updateWorkflowClient';
import { useRouter } from 'next/navigation'; 



const SaveButton = ({workflowId }: { workflowId: string; }) => {
    const { toObject } = useReactFlow();
    const router = useRouter();

    const saveMutation = useMutation({
        mutationFn: updateWorkflowClient,

        onMutate: () => {
            toast.loading("Saving workflow...", {
                id: "save-workflow-toast",
                position: "top-center"
            })
        },

        onSuccess: () => {
            toast.success("Workflow saved successfully", {
                id: "save-workflow-toast",
                position: "top-center"
            })
        },

        onError: (error: any) => {
            toast.error(error?.message ?? "Failed to save workflow", {
                id: "save-workflow-toast",
                position: "top-center"
            })
        },
    })

    const handleSave = () => {
        const { nodes, edges, viewport } = toObject()

        const definition = JSON.stringify({
            nodes,
            edges,
            viewport,
        })
        console.log("Saving workflow with definition:", definition)

        saveMutation.mutate({
            id: workflowId,
            definition,
        })
    }




  return (
      <div className='flex gap-2'>

          <Button
              variant="outline"
              className="flex items-center gap-2"
              onClickCapture={() => {
                  router.refresh()       
              }}
          >
              <RefreshCw size={16} />
              </Button>
          

          <Button

              variant="outline"
              disabled={saveMutation.isPending}
              className="flex items-center gap-2"
              onClick={handleSave}
          >
              {saveMutation.isPending ? (
                  <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                  </>
              ) : (
                  <>
                      <CheckIcon size={16} />
                      Save
                  </>
              )}
          </Button>

    </div>
  )
}

export default SaveButton