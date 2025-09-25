import { Priority, Status } from "@/shared/enums";

export interface Ticket {
  createdAt: string;
  description: string;
  id: string;
  priority: Priority;
  status: Status;
  title: string;
  updatedAt: string;
}

interface Meta {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface TicketResponse {
  items: Ticket[];
  meta: Meta;
}
