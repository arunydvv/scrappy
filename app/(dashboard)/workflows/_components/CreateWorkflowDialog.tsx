"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import HovercardText from "@/components/HovercardText";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import {
  CreateWorkflowInputSchema,
  createWorkflowSchema,
} from "@/schema/workflow";

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // ✅ Hooks MUST be declared before any return
  const form = useForm<CreateWorkflowInputSchema>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow created", { id: "create-workflow" });
      form.reset();
      setOpen(false);
      router.push(`/workflow/editor/${data.id}`);
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: CreateWorkflowInputSchema) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Conditional rendering AFTER hooks
  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          {triggerText ?? "Create workflow"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />

        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <span className="text-xs text-primary mx-2">
                        <HovercardText
                          text="*"
                          textMessage="This field is required"
                        />
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description{" "}
                      <span className="text-xs text-primary">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what this workflow does.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Proceed"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
