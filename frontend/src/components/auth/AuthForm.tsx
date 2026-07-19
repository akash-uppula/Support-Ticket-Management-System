"use client";

import Link from "next/link";

import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface Field<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
  placeholder: string;
}

interface AuthFormProps<T extends FieldValues> {
  title: string;

  subtitle: string;

  fields: Field<T>[];

  register: UseFormRegister<T>;

  errors: FieldErrors<T>;

  error: string;

  onSubmit: React.FormEventHandler<HTMLFormElement>;

  isSubmitting: boolean;

  buttonText: string;

  footerText: string;

  footerLink: string;

  footerLinkText: string;
}

export default function AuthForm<T extends FieldValues>({
  title,
  subtitle,
  fields,
  register,
  errors,
  error,
  onSubmit,
  isSubmitting,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
}: AuthFormProps<T>) {
  return (
    <main className="mx-auto mt-16 max-w-md rounded-lg border p-8 shadow-sm">
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>

      <p className="mb-6 text-sm text-gray-600">{subtitle}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
            error={errors[field.name]?.message as string}
          />
        ))}
        <ErrorMessage message={error} />
        <Button isLoading={isSubmitting}>{buttonText}</Button>
      </form>

      <p className="mt-6 text-center text-sm">
        {footerText}

        <Link href={footerLink} className="ml-2 text-blue-600 hover:underline">
          {footerLinkText}
        </Link>
      </p>
    </main>
  );
}
