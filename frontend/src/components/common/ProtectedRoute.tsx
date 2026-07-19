"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
  role?: "admin" | "customer";
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");

      return;
    }

    if (!loading && user && role && user.role !== role) {
      router.replace("/dashboard");
    }
  }, [loading, user, role, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  if (role && user.role !== role) {
    return null;
  }

  return <>{children}</>;
}
