"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "@/components/auth/AuthForm";

import { loginSchema, LoginFormData } from "@/utils/auth.schema";
import { login as loginUser } from "@/services/auth.service";

import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";

export default function LoginPage() {
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await execute(() => loginUser(data));

    if (!response) return;

    await login(response.token);

    router.push("/dashboard");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthForm<LoginFormData>
      title="Login"
      subtitle="Sign in to your account"
      fields={[
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
      buttonText="Login"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
    />
  );
}
