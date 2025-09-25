import { api } from "@/lib/api/api";
import { Ticket, TicketResponse } from "@/lib/api/interface";
import { Priority, Status } from "@/shared/enums";
import { CreateTicketFields, UpdateTicketFields } from "@/shared/types";

interface GetTicketQueryInput {
  status?: Status;
  priority?: Priority;
  pageSize?: number;
  pageNumber?: number;
  sortOrder?: "asc" | "desc";
  keywords?: string;
}

export const getTickets = async (
  input: GetTicketQueryInput
): Promise<TicketResponse> => {
  const {
    status,
    priority,
    pageSize = 50,
    pageNumber = 0,
    sortOrder = "desc",
    keywords,
  } = input;

  return api.get<TicketResponse>("tickets", {
    status,
    priority,
    pageSize,
    pageNumber,
    sortBy: "createdAt",
    sortOrder,
    keywords,
  });
};

export const getTicket = async (id: string): Promise<Ticket> => {
  return api.getById<Ticket>("tickets", id);
};

export const createTicket = async (
  input: CreateTicketFields
): Promise<Ticket> => {
  return api.post<Ticket, CreateTicketFields>("tickets", input);
};

export const updateTicket = async (
  id: string,
  ticket: Partial<UpdateTicketFields>
): Promise<Ticket> => {
  return api.patch<Ticket, Partial<UpdateTicketFields>>(
    `tickets/${id}`,
    ticket
  );
};

export const deleteTicket = async (id: string): Promise<void> => {
  return api.delete(`tickets/${id}`);
};
