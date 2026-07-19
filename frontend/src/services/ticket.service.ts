import api from "@/lib/axios";
import { Ticket } from "@/types/ticket";

interface CreateTicketData {
  title: string;
  description: string;
  category: Ticket["category"];
  priority?: Ticket["priority"];
}

interface UpdateTicketData {
  title?: string;
  description?: string;
  category?: Ticket["category"];
}

export const getMyTickets = async (): Promise<Ticket[]> => {
  const response = await api.get("/tickets");

  return response.data.data;
};

export const createTicket = async (data: CreateTicketData): Promise<Ticket> => {
  const response = await api.post("/tickets", data);

  return response.data.data;
};

export const getTicket = async (id: string): Promise<Ticket> => {
  const response = await api.get(`/tickets/${id}`);

  return response.data.data;
};

export const updateTicket = async (
  id: string,
  data: UpdateTicketData,
): Promise<Ticket> => {
  const response = await api.put(`/tickets/${id}`, data);

  return response.data.data;
};

export const deleteTicket = async (id: string): Promise<void> => {
  await api.delete(`/tickets/${id}`);
};
