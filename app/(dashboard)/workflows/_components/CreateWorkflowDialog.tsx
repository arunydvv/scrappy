"use client";

import React, { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Layers2Icon, Loader2 } from "lucide-react"
import CustomDialogHeader from "@/components/CustomDialogHeader"
import { CreateWorkflowInputSchema, createWorkflowSchema } from "@/schema/workflow"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import HovercardText from "@/components/HovercardText";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter();

  const form = useForm<CreateWorkflowInputSchema>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow created", {
        id: "create-workflow",
      });
      form.reset();
      setOpen(false);
    },
    onError: (err) => {
      console.log("Error creating workflow:", err);
      toast.error("Failed to create workflow", {
        id: "create-workflow",
      });
    },
  });


  const onSubmit = async (values: CreateWorkflowInputSchema) => {
    try {
      toast.loading("Creating workflow...", { id: "create-workflow" });

      // 👇 Force plain object
      const payload: CreateWorkflowInputSchema = {
        name: values.name,
        description: values.description ?? "",
      };

      const result = await CreateWorkflow(payload);

      toast.success("Workflow created", { id: "create-workflow" });
      form.reset();
      setOpen(false);
      router.refresh();

    } catch (e) {
      console.error("Error creating workflow:", e);
      toast.error("Failed to create workflow", { id: "create-workflow" });
    }
  };




  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          form.reset(); // reset ONLY on close
        }
        setOpen(nextOpen);
      }}
    >

      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>

      <DialogContent>
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
          subtitleClassName=""
        />

        <div className="p-6">
          <Form {...form}>
            <form className="space-y-8 w-full"
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
                        {/* (required) */}
                        <HovercardText
                          text={"*"}
                          textMessage={"This field is required for you to enter"}
                        />
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                      />
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
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <span className="text-xs text-primary">
                        (optional)

                      </span>
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      Provide a brief description of what this workflow does.
                      This is optional, but it helps you remember the workflow’s purpose.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending
                  ? (<Loader2 className="animate-spin" />)
                  : ("Proceed")
                }
              </Button>


            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog
