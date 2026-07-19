"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import TicketCard from "@/components/tickets/TicketCard";

import { deleteTicket, getMyTickets } from "@/services/ticket.service";

import { useApi } from "@/hooks/useApi";

import { Ticket } from "@/types/ticket";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState(true);

  const { execute } = useApi();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getMyTickets();

        setTickets(data);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this ticket?");

    if (!confirmed) return;

    const response = await execute(() => deleteTicket(id));

    if (response === null) return;

    setTickets((previous) => previous.filter((ticket) => ticket._id !== id));
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="mx-auto mt-8 max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">My Tickets</h1>

        {loading && <p>Loading...</p>}

        {!loading && tickets.length === 0 && <p>No tickets found.</p>}

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}
