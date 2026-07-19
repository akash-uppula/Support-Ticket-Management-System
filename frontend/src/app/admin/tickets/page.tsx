"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import AdminTicketRow from "@/components/admin/AdminTicketRow";

import { updateTicketByAdmin } from "@/services/admin.service";
import { getAllTickets } from "@/services/admin.service";
import { Ticket } from "@/types/ticket";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getAllTickets();
      setTickets(data);
    };

    fetchTickets();
  }, []);

  const handleSave = async (
    id: string,
    status: Ticket["status"],
    priority: Ticket["priority"],
  ) => {
    const confirmed = window.confirm("Save changes?");
    if (!confirmed) return;

    const updated = await updateTicketByAdmin(id, {
      status,
      priority,
    });

    setTickets((previous) =>
      previous.map((ticket) => (ticket._id === id ? updated : ticket)),
    );
  };

  return (
    <ProtectedRoute role="admin">
      <Navbar />

      <main className="mx-auto mt-8 max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Manage Tickets</h1>

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-3">Customer</th>
              <th>Email</th>
              <th>Category</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <AdminTicketRow
                key={ticket._id}
                ticket={ticket}
                onSave={handleSave}
              />
            ))}
          </tbody>
        </table>
      </main>
    </ProtectedRoute>
  );
}
