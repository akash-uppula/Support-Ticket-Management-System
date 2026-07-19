"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import StatCard from "@/components/admin/StatCard";

import {
  DashboardStats,
  getDashboardStats,
} from "@/services/admin.service";

export default function AdminDashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats>({
      Open: 0,
      "In Progress": 0,
      Resolved: 0,
      Closed: 0,
    });
    

  useEffect(() => {
    const fetchStats = async () => {
      const data =
        await getDashboardStats();

      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <ProtectedRoute role="admin">

      <Navbar />

      <main className="mx-auto mt-8 max-w-6xl">

        <h1 className="mb-8 text-3xl font-bold">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

          <StatCard
            title="Open"
            count={stats.Open}
          />

          <StatCard
            title="In Progress"
            count={stats["In Progress"]}
          />

          <StatCard
            title="Resolved"
            count={stats.Resolved}
          />

          <StatCard
            title="Closed"
            count={stats.Closed}
          />

        </div>

      </main>

    </ProtectedRoute>
  );
}