"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-lg font-bold">
            Support Ticket System
          </Link>

          <Link href="/dashboard">Dashboard</Link>

          <Link href="/tickets">My Tickets</Link>

          <Link href="/tickets/new">Create Ticket</Link>

          {user?.role === "admin" && (
            <>
              <Link href="/admin">Admin Dashboard</Link>

              <Link href="/admin/tickets">Manage Tickets</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.name}</span>

          <button
            onClick={logout}
            className="rounded bg-red-500 px-3 py-1 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
