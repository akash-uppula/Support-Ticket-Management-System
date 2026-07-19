"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import TicketForm from "@/components/tickets/TicketForm";

import { ticketSchema, TicketFormData } from "@/utils/ticket.schema";

import { getTicket, updateTicket } from "@/services/ticket.service";

import { useApi } from "@/hooks/useApi";

export default function EditTicketPage() {
  const params = useParams();

  const router = useRouter();

  const { execute, error } = useApi();

  const [loadingTicket, setLoadingTicket] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  useEffect(() => {
    const fetchTicket = async () => {
      setLoadingTicket(true);

      const ticket = await execute(() => getTicket(params.id as string));

      if (!ticket) {
        setLoadingTicket(false);
        return;
      }

      reset({
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
      });

      setLoadingTicket(false);
    };

    fetchTicket();
  }, [params.id]);

  const onSubmit = async (data: TicketFormData) => {
    const confirmed = window.confirm("Save changes?");

    if (!confirmed) return;
    const updated = await execute(() =>
      updateTicket(params.id as string, data),
    );

    if (!updated) return;

    router.push("/tickets");
  };

  if (loadingTicket) {
    return (
      <ProtectedRoute>
        <Navbar />

        <main className="mx-auto mt-8 max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold">Edit Ticket</h1>

          <p>Loading ticket...</p>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="mx-auto mt-8 max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Edit Ticket</h1>

        <TicketForm
          register={register}
          errors={errors}
          error={error}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
          buttonText="Update Ticket"
        />
      </main>
    </ProtectedRoute>
  );
}
