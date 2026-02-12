import { TextIcon } from 'lucide-react';

import { TaskType } from '@/types/tasks';

import { WorkflowTask } from '@/types/workflowTypes';
import { TaskParamsType } from '@/types/tasks';

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: 'Extract text from element',
  icon: (props) => <TextIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: 'Html',
      type: TaskParamsType.STRING,
      required: true,
      variant: 'textarea',
    },
    {
      name: 'Selector',
      type: TaskParamsType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: 'Extracted text',
      type: TaskParamsType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;