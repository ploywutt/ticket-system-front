"use client";

import { createTicket } from "@/app/apis/ticket";
import { Button, Container, PriorityBadge, Select } from "@/components";
import { LoadingError } from "@/components/states/error";
import { Priority } from "@/shared/enums";
import { CreateTicketFields } from "@/shared/types";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CreateTicketPage() {
  const router = useRouter();

  const { mutate: createTicketMutate, error: createError } = useMutation({
    mutationFn: (newTicket: CreateTicketFields) => createTicket(newTicket),
    onSuccess: async () => {
      console.log("✅ Ticket created, navigating...");
      router.replace("/tickets");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: Priority.LOW,
    },
    onSubmit: async ({ value }: { value: CreateTicketFields }) => {
      console.log("Creating ticket...", value);
      createTicketMutate(value);
    },
  });

  if (createError) return <LoadingError />;

  return (
    <Container className="h-full md:gap-4 px-4 lg:px-12 xl:px-36 pb-8">
      <div className="h-full flex flex-col gap-8 p-8 bg-foreground rounded-md">
        <p className="text-2xl font-bold">Create Ticket</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-2 md:gap-4"
        >
          <form.Field
            name="title"
            validators={{
              onBlur: ({ value }) => {
                if (!value) return "Title is required";
                if (value.length < 5) {
                  return "Title must be at least 5 characters";
                }
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <input
                  placeholder="Title"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="px-1 md:px-4 py-1 rounded-md text-sm md:text-2xl font-semibold ring ring-primary/[.25] focus:outline-none line-clamp-1 focus:bg-primary/[.10]"
                  onBlur={field.handleBlur}
                />
                {!field.state.meta.isValid && (
                  <em className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                  </em>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) => {
                if (value.length > 5000) {
                  return "Description must be less than 5,000 characters";
                }
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <textarea
                  placeholder="Description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-4 rounded-md min-h-[300px] outline-none ring ring-primary/[.25] focus:outline-none resize-none focus:bg-primary/[.10]"
                />
                {field.state.meta.errors.length > 0 && (
                  <em className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                  </em>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="priority">
            {(field) => (
              <div className="flex-center w-fit">
                <label htmlFor="priority" className="text-xs text-mute mr-1">
                  Priority
                </label>
                <Select
                  items={Object.values(Priority)}
                  selected={field.state.value}
                  onChange={(item) => field.handleChange(item as Priority)}
                  renderSelected={(item) => (
                    <PriorityBadge priority={item as Priority} />
                  )}
                  renderItem={(item) => (
                    <PriorityBadge priority={item as Priority} />
                  )}
                />
              </div>
            )}
          </form.Field>
          <div className="self-end">
            <Button type="submit" title="Create" variant="default" />
          </div>
        </form>
      </div>
    </Container>
  );
}
