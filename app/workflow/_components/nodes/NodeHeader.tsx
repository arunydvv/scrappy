"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { TaskType } from "@/types/tasks"
import { CoinsIcon, GripVerticalIcon } from "lucide-react"
import React from "react"

const NodeHeader = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType]

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 border-b bg-muted/40 rounded-t-md">
      {/* Left: Icon + Label */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-background border">
          <task.icon size={14} className="text-muted-foreground" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-foreground truncate">
          {task.label}
        </p>
      </div>

      {/* Right: Badges + Drag */}
      <div className="flex items-center gap-1.5">
        {task.isEntryPoint && (
          <Badge variant="secondary" className="text-[10px] px-1.5">
            Entry Point
          </Badge>
        )}

        <Badge
          variant="outline"
          className="flex items-center gap-1 text-[10px] px-1.5"
        >
          <CoinsIcon size={10} />
          TODO
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          className="drag-handle h-7 w-7 cursor-grab text-muted-foreground hover:text-foreground"
        >
          <GripVerticalIcon size={14} />
        </Button>
      </div>
    </div>
  )
}

export default NodeHeader
