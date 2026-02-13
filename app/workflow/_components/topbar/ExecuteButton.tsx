'use client';

import { PlayIcon } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import useExecutionPlan from '../../../../components/hooks/useExecutionPlan';
import { RunWorkflow } from '@/actions/execution/runWorkflow';

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
    const generate = useExecutionPlan();
    const { toObject } = useReactFlow();
    const [isPending, startTransition] = useTransition();

    const handleExecute = () => {
        const plan = generate();

        // client-side validation
        if (!plan) return;

        startTransition(async () => {
            try {
                await RunWorkflow({
                    workflowId,
                    flowDefinition: JSON.stringify(toObject()),
                });

                toast.success('Execution started successfully.', {
                    id: 'flow-execution',
                });
            } catch (error: any) {
                console.error(error);

                toast.error(
                    error?.message || 'Execution failed. Please try again.',
                    { id: 'flow-execution' }
                );
            }
        });
    };

    return (
        <Button
            variant="outline"
            className="flex items-center gap-2"
            disabled={isPending}
            onClick={handleExecute}
        >
            <PlayIcon size={16} className="stroke-orange-400" />
            {isPending ? 'Starting...' : 'Execute'}
        </Button>
    );
}
