"use client";

import { useState } from "react";

import { Ticket } from "@/types/ticket";

interface Props {
  ticket: Ticket;

  onSave: (
    id: string,
    status: Ticket["status"],
    priority: Ticket["priority"],
  ) => void;
}

export default function AdminTicketRow({ ticket, onSave }: Props) {
  const [status, setStatus] = useState(ticket.status);

  const [priority, setPriority] = useState(ticket.priority);

  const customer =
    typeof ticket.createdBy === "string" ? null : ticket.createdBy;

  return (
    <tr className="border-b">
      <td className="p-3 mx-5">{customer?.name ?? "-"}</td>

      <td className="p-3 mx-5">{customer?.email ?? "-"}</td>

      <td className="p-3 mx-5">{ticket.category}</td>
      <td className="p-3 mx-5">{ticket.title}</td>

      <td className="p-3 mx-5">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Ticket["status"])}
        >
          <option className="text-black">Open</option>
          <option className="text-black">In Progress</option>
          <option className="text-black">Resolved</option>
          <option className="text-black">Closed</option>
        </select>
      </td>

      <td className="p-3 mx-5">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Ticket["priority"])}
        >
          <option className="text-black">Low</option>
          <option className="text-black">Medium</option>
          <option className="text-black">High</option>
        </select>
      </td>

      <td className="p-3 mx-5">
        <button
          onClick={() => onSave(ticket._id, status, priority)}
          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </td>
    </tr>
  );
}
