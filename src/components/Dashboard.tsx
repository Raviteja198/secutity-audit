"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type DashboardData = {
  totalMembers: number;
  monthlyCollections: number;
  totalCollections: number;
  pendingPayments: number;
  overdueLoans: number;
  activeLoans: number;
  totalCharity: number;
  fundBalance: number;
  monthlyTrend: { month: string; year: number; amount: number }[];
};

function fmt(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const query = useMemo(
    () => `/api/admin/dashboard?month=${selectedMonth}&year=${selectedYear}`,
    [selectedMonth, selectedYear],
  );

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const res = await fetch(query);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = (await res.json()) as DashboardData;
        if (active) setData(json);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, [query]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold text-zinc-900">Dashboard</h1>
        <div className="text-zinc-600">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold text-zinc-900">Dashboard</h1>
        <div className="text-red-600">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-lg sm:text-2xl font-semibold text-zinc-900">Dashboard</h1>
        
        <div className="flex gap-2 sm:gap-4">
          <div className="space-y-1">
            <label htmlFor="monthSelect" className="text-xs sm:text-sm font-medium text-zinc-800">Month</label>
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={(e) => {
                setLoading(true);
                setSelectedMonth(Number(e.target.value));
              }}
              className="rounded border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="yearSelect" className="text-xs sm:text-sm font-medium text-zinc-800">Year</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => {
                setLoading(true);
                setSelectedYear(Number(e.target.value));
              }}
              className="rounded border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Total Members</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{data.totalMembers}</div>
        </div>

        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Monthly Collections</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{fmt(data.monthlyCollections)}</div>
        </div>

        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Total Collections</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{fmt(data.totalCollections)}</div>
        </div>

        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Pending Payments</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{data.pendingPayments}</div>
        </div>

        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Overdue Loans</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{data.overdueLoans}</div>
        </div>

        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Active Loans</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{data.activeLoans}</div>
        </div>

        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Total Charity</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{fmt(data.totalCharity)}</div>
        </div>

        <div className="lux-card p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xs sm:text-sm text-zinc-500">Fund Balance</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">{fmt(data.fundBalance)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="lux-card p-3 sm:p-6 rounded-lg sm:rounded-xl">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Monthly Collections Trend</h2>
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => value ? `₹${(value / 100).toFixed(0)}` : "₹0"} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number | undefined) => [value ? fmt(value) : "₹0.00", "Collections"]} />
              <Line type="monotone" dataKey="amount" stroke="#3f3f46" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="lux-card p-3 sm:p-6 rounded-lg sm:rounded-xl">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <a
            href="/admin/members"
            className="p-3 sm:p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-xs sm:text-sm font-medium text-zinc-900">Manage Members</div>
            <div className="text-xs text-zinc-500">Add, edit, or view members</div>
          </a>

          <a
            href="/admin/payments"
            className="p-3 sm:p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-xs sm:text-sm font-medium text-zinc-900">Record Payments</div>
            <div className="text-xs text-zinc-500">Process member contributions</div>
          </a>

          <a
            href="/admin/loans"
            className="p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-sm font-medium text-zinc-900">Manage Loans</div>
            <div className="text-xs text-zinc-500">Approve and track loans</div>
          </a>

          <a
            href="/admin/reports"
            className="p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-sm font-medium text-zinc-900">Generate Reports</div>
            <div className="text-xs text-zinc-500">Export data and analytics</div>
          </a>
        </div>
      </div>
    </div>
  );
}
