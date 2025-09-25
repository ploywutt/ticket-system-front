"use client";

import { deleteTicket, getTicket, updateTicket } from "@/app/apis/ticket";
import {
  Badge,
  Button,
  Container,
  PriorityBadge,
  Select,
  StatusBadge,
} from "@/components";
import { Modal } from "@/components/modal";
import { NotFound } from "@/components/states/notFound";
import { Ticket } from "@/lib/api/interface";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/date";
import { Priority, Status } from "@/shared/enums";
import { UpdateTicketFields } from "@/shared/types";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, Edit, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TicketPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : undefined;

  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [priority, setPriority] = useState<Priority | undefined>();
  const [status, setStatus] = useState<Status | undefined>();

  const { data, error } = useQuery<Ticket, Error>({
    queryKey: ["tickets", id],
    queryFn: () => getTicket(id as string),
    enabled: !deleted && !!id,
  });

  const {
    mutate: updateDataMutate,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (ticket: UpdateTicketFields) =>
      updateTicket(id as string, ticket),
    onSuccess: () => {
      setIsEdit(false);
      console.log("✅ Ticket updated");
    },
  });

  const {
    mutate: deleteTicketMutate,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: () => deleteTicket(id as string),
    onSuccess: async () => {
      setDeleted(true);
      console.log("✅ Ticket deleted, navigating...");
      router.replace("/tickets");
    },
  });

  const form = useForm({
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      priority: data?.priority || Priority.LOW,
      status: data?.status || Status.OPEN,
    },
    onSubmit: async ({ value }: { value: UpdateTicketFields }) => {
      updateDataMutate(value);
      setIsEdit(false);
    },
  });

  const handleFieldChange = <K extends keyof UpdateTicketFields>(
    key: K,
    value: UpdateTicketFields[K]
  ) => {
    if (!data) return;

    if (key === "priority") setPriority(value as Priority);
    if (key === "status") setStatus(value as Status);

    const updatedData: UpdateTicketFields = {
      title: data.title,
      description: data.description,
      priority: key === "priority" ? (value as Priority) : data.priority,
      status: key === "status" ? (value as Status) : data.status,
    };

    updateDataMutate(updatedData);
  };

  if (error || updateError || deleteError) return <NotFound />;

  return (
    <Container className="md:gap-4 px-4 lg:px-12 xl:px-36 pb-8">
      <div className="flex flex-col justify-between gap-4 md:gap-8 p-8 bg-foreground rounded-md h-full">
        <div className="flex flex-col-reverse text-center md:flex-row items-center gap-1 lg:gap-4">
          <div className="flex-center">
            <p className="text-xs text-mute">Ticket ID</p>
            <Badge
              className="text-primary bg-disabled w-fit"
              title={data?.id}
            />
          </div>
          <div className="flex-center">
            <p className="text-xs text-mute">Priority</p>
            <Select
              items={Object.values(Priority)}
              selected={priority || data?.priority}
              renderSelected={(item) => (
                <PriorityBadge priority={item as Priority} />
              )}
              renderItem={(item) => (
                <PriorityBadge priority={item as Priority} />
              )}
              onChange={(item) =>
                handleFieldChange("priority", item as Priority)
              }
            />
          </div>
          <div className="flex-center">
            <p className="text-xs text-mute">Ticket Status</p>
            <Select
              items={Object.values(Status)}
              selected={status || data?.status}
              renderSelected={(item) => <StatusBadge status={item as Status} />}
              renderItem={(item) => <StatusBadge status={item as Status} />}
              onChange={(item) => handleFieldChange("status", item as Status)}
            />
          </div>
          <Button
            onClick={() => setIsOpenDeleteModal(true)}
            className="ml-auto text-mute ring ring-mute text-xs hover:bg-red-500 hover:ring-red-500 hover:text-white"
            variant="icon"
            icon={<Trash2 className="size-4" />}
            disabled={isDeleting}
          />
        </div>
        <div className="flex flex-col gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-2 md:gap-4"
          >
            <form.Field name="title">
              {(field) => (
                <input
                  readOnly={!isEdit}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    "px-1 md:px-4 py-1 text-sm md:text-2xl font-semibold focus:outline-none line-clamp-1",
                    {
                      "focus:border border-primary bg-primary/[.10] rounded-md":
                        isEdit,
                    }
                  )}
                />
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <textarea
                  readOnly={!isEdit}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    "w-full p-4 rounded-md min-h-[300px]",
                    "outline-none focus:outline-none resize-none",
                    {
                      "focus:border border-primary bg-primary/[.10]": isEdit,
                      "border border-secondary/[.25]": !isEdit,
                    }
                  )}
                />
              )}
            </form.Field>
            <div className={cn("self-end space-x-2", { hidden: !isEdit })}>
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  setIsEdit(false);
                }}
                title="Cancel"
                variant="outline"
                disabled={isUpdating}
              />
              <Button
                type="submit"
                title="Save"
                variant="default"
                disabled={isUpdating}
              />
            </div>
          </form>
          <div className={cn("self-end", { hidden: isEdit })}>
            <Button
              onClick={() => setIsEdit((prev) => !prev)}
              title="Edit"
              variant="outline"
              icon={<Edit className="size-4" />}
              disabled={isDeleting}
            />
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-mute">
            Created at : {formatDate(data?.createdAt ?? "")}
          </p>
          <p className="text-xs text-mute">
            Last updated at : {formatDate(data?.updatedAt ?? "")}
          </p>
        </div>
      </div>
      <Modal
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
      >
        <div className="flex-center">
          <p className="text-xs text-mute">Ticket ID</p>
          <Badge className="text-primary bg-disabled w-fit" title={data?.id} />
        </div>
        <div className="flex flex-col items-center gap-2 my-8">
          <AlertCircle className="size-16 text-primary" />
          <p className="text-xl font-bold">
            Are you sure you want to delete this ticket?
          </p>
        </div>

        <div className="w-full mt-4 flex justify-end gap-4">
          <Button
            onClick={() => setIsOpenDeleteModal(false)}
            title="Cancel"
            variant="outline"
          />
          <Button
            onClick={() => deleteTicketMutate()}
            title="Delete"
            variant="default"
          />
        </div>
      </Modal>
    </Container>
  );
}
