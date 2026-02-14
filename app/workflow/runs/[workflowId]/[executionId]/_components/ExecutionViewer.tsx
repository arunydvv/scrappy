'use client';

import { useQuery } from '@tanstack/react-query';
import { WorkflowExecutionStatus } from '@/types/workflowTypes';
import { refetchExecution } from '@/actions/execution/refetchExecutions';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, CircleDashedIcon } from 'lucide-react';

type ExecutionData = NonNullable<
  Awaited<ReturnType<typeof refetchExecution>>
>;

const ExecutionViewer = ({ initialData }: {
  initialData: ExecutionData;
}) => {

  const query = useQuery({
    queryKey: ["execution", initialData.id],
    queryFn: () => refetchExecution(initialData.id),
    initialData,
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING
        ? 1000
        : false,
  });

  return (
    <div className='flex w-full h-full'>
      <aside className='w-[440px] min-w-[440px] max-w-[440px] border-2 border-separate flex flex-grow flex-col overflow-hidden'>
        <div className='py-4 px-2'>
          <div className='flex justify-between items-center py-2 px-4 text-sm'>
            <div className='text-muted0foreground flex items-center gap-2 '>
              <CircleDashedIcon size={20}
              className='stroke-muted-foreground/80'
              />
              <span>Status</span>
            </div>
            <div className='font-semibold capitalize flex gap-2 items-center'>
              {query.data?.status}
            </div>
          </div>

          <div className='flex justify-between  items-center py-2 px-4 text-sm'>
            <div className='text-muted-foreground flex items-center gap-2'>
              <CalendarIcon size={20} className='stroke-muted-foreground/80' />
              <span>Started At</span>
            </div> 
            <div className='font-semibold lowercase flex gap-2 items-center'>
              {query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt)) : "-" }
            </div>
          </div>

        </div>

      </aside>

    </div>
  )
};

export default ExecutionViewer;
