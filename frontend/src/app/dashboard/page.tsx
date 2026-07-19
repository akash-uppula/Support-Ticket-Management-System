"use client";

import Navbar from "@/components/layout/Navbar";

import ProtectedRoute from "@/components/common/ProtectedRoute";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="max-w-5xl mx-auto mt-8">
        <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>

        <p className="mt-2">Role: {user?.role}</p>
      </main>
    </ProtectedRoute>
  );
}
