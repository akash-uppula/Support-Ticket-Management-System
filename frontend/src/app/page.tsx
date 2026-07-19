"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-3xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Support Management Platform
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
          Support Ticket
          <br />
          System
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-zinc-400">
          A simple and secure ticket management system where customers can
          create support requests and administrators can efficiently manage,
          prioritize, and resolve them.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-lg border border-white px-8 py-3 font-medium transition-all duration-300 hover:bg-white hover:text-black"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-zinc-600 px-8 py-3 font-medium text-zinc-300 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
