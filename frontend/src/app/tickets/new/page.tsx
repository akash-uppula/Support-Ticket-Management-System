"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import TicketForm from "@/components/tickets/TicketForm";

import { ticketSchema, TicketFormData } from "@/utils/ticket.schema";

import { createTicket } from "@/services/ticket.service";

import { useApi } from "@/hooks/useApi";

export default function CreateTicketPage() {
  const router = useRouter();

  const { execute, error } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (data: TicketFormData) => {
    const response = await execute(() => createTicket(data));

    if (!response) return;

    router.push("/tickets");
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="mx-auto mt-8 max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Create Ticket</h1>

        <TicketForm
          register={register}
          errors={errors}
          error={error}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
          buttonText="Create Ticket"
        />
      </main>
    </ProtectedRoute>
  );
}
