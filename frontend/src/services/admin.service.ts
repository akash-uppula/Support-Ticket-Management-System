import api from "@/lib/axios";
import { Ticket } from "@/types/ticket";

export interface DashboardStats {
  Open: number;
  "In Progress": number;
  Resolved: number;
  Closed: number;
}

interface AdminUpdateData {
  status?: Ticket["status"];
  priority?: Ticket["priority"];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/admin/dashboard");

  return response.data.data;
};

export const getAllTickets = async (): Promise<Ticket[]> => {
  const response = await api.get("/admin/tickets");

  return response.data.data;
};

export const updateTicketByAdmin = async (
  id: string,
  data: AdminUpdateData,
): Promise<Ticket> => {
  const response = await api.patch(`/admin/tickets/${id}`, data);
  console.log(response.data.data);

  return response.data.data;
};
