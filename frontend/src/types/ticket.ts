export type TicketCategory =
  | "Technical"
  | "Billing"
  | "Account"
  | "Bug"
  | "Feature Request";

export type TicketPriority = "Low" | "Medium" | "High";

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface TicketUser {
  _id: string;

  name: string;

  email: string;
}

export interface Ticket {
  _id: string;

  title: string;

  description: string;

  category: TicketCategory;

  priority: TicketPriority;

  status: TicketStatus;

  createdBy: string | TicketUser;

  createdAt: string;

  updatedAt: string;
}
