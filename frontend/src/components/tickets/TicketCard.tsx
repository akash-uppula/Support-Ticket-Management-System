"use client";

import Link from "next/link";

import { Ticket } from "@/types/ticket";

interface Props {
  ticket: Ticket;

  onDelete: (id: string) => void;
}

export default function TicketCard({ ticket, onDelete }: Props) {
  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{ticket.title}</h2>

          <p className="mt-2 text-gray-600">{ticket.description}</p>
        </div>

        <span className="rounded bg-gray-100 text-black px-3 py-1 text-sm">
          {ticket.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span>{ticket.category}</span>

          <span>{ticket.priority}</span>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/tickets/${ticket._id}`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(ticket._id)}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
