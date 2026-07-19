"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ErrorMessage from "@/components/ui/ErrorMessage";

import { TicketFormData } from "@/utils/ticket.schema";

interface Props {
  register: UseFormRegister<TicketFormData>;

  errors: FieldErrors<TicketFormData>;

  error: string;

  isSubmitting: boolean;

  onSubmit: React.FormEventHandler<HTMLFormElement>;

  buttonText: string;
}

export default function TicketForm({
  register,
  errors,
  error,
  isSubmitting,
  onSubmit,
  buttonText,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border p-6 shadow-sm"
    >
      <Input
        label="Title"
        placeholder="Enter ticket title"
        {...register("title")}
        error={errors.title?.message}
      />

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>

        <textarea
          {...register("description")}
          rows={4}
          className="w-full rounded border p-2"
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Category</label>

        <select {...register("category")} className="w-full rounded border p-2">
          <option value="" className="text-black">
            Select Category
          </option>

          <option value="Technical" className="text-black">
            Technical
          </option>

          <option value="Billing" className="text-black">
            Billing
          </option>

          <option value="Account" className="text-black">
            Account
          </option>

          <option value="Bug" className="text-black">
            Bug
          </option>

          <option value="Feature Request" className="text-black">
            Feature Request
          </option>
        </select>

        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Priority</label>

        <select {...register("priority")} className="w-full rounded border p-2">
          <option value="Medium" className="text-black">
            Medium
          </option>

          <option value="Low" className="text-black">
            Low
          </option>

          <option value="High" className="text-black">
            High
          </option>
        </select>
      </div>

      <ErrorMessage message={error} />

      <Button isLoading={isSubmitting}>{buttonText}</Button>
    </form>
  );
}
