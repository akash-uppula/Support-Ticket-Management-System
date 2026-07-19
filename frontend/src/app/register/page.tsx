"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "@/components/auth/AuthForm";

import { registerSchema, RegisterFormData } from "@/utils/auth.schema";

import { register as registerUser } from "@/services/auth.service";

import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";

export default function RegisterPage() {
  const router = useRouter();

  const { login, user, loading } = useAuth();

  const { execute, error } = useApi();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const response = await execute(() => registerUser(data));

    if (!response) return;

    await login(response.token);

    router.push("/dashboard");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthForm<RegisterFormData>
      title="Register"
      subtitle="Create your account"
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      ]}
      register={register}
      errors={errors}
      error={error}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      buttonText="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    />
  );
}
