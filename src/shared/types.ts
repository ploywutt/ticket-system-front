import { Ticket } from "@/lib/api/interface";

export type UpdateTicketFields = Pick<
  Ticket,
  "title" | "description" | "priority" | "status"
>;

export type CreateTicketFields = Pick<
  Ticket,
  "title" | "description" | "priority"
>;
