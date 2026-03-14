"use client";

import { useEffect, useState } from "react";
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

export function UserDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const loadData = () => {
    setLoading(true);
    fetch(`/api/user/dashboard?month=${selectedMonth}&year=${selectedYear}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => console.error("Dashboard fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [selectedMonth, selectedYear]);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900">Dashboard</h1>
        
        <div className="flex gap-4">
          <div className="space-y-1">
            <label htmlFor="monthSelect" className="text-sm font-medium text-zinc-800">Month</label>
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="rounded border px-3 py-2 text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="yearSelect" className="text-sm font-medium text-zinc-800">Year</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded border px-3 py-2 text-sm"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Total Members</div>
          <div className="text-2xl font-bold text-zinc-900">{data.totalMembers}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Monthly Collections</div>
          <div className="text-2xl font-bold text-zinc-900">{fmt(data.monthlyCollections)}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Total Collections</div>
          <div className="text-2xl font-bold text-zinc-900">{fmt(data.totalCollections)}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Pending Payments</div>
          <div className="text-2xl font-bold text-zinc-900">{data.pendingPayments}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Overdue Loans</div>
          <div className="text-2xl font-bold text-zinc-900">{data.overdueLoans}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Active Loans</div>
          <div className="text-2xl font-bold text-zinc-900">{data.activeLoans}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Total Charity</div>
          <div className="text-2xl font-bold text-zinc-900">{fmt(data.totalCharity)}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-zinc-500">Fund Balance</div>
          <div className="text-2xl font-bold text-zinc-900">{fmt(data.fundBalance)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Monthly Collections Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => value ? `₹${(value / 100).toFixed(0)}` : "₹0"} />
            <Tooltip formatter={(value: number | undefined) => [value ? fmt(value) : "₹0.00", "Collections"]} />
            <Line type="monotone" dataKey="amount" stroke="#3f3f46" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/user/members"
            className="p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-sm font-medium text-zinc-900">View Members</div>
            <div className="text-xs text-zinc-500">Browse member information</div>
          </a>

          <a
            href="/user/payments"
            className="p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-sm font-medium text-zinc-900">View Payments</div>
            <div className="text-xs text-zinc-500">Check payment records</div>
          </a>

          <a
            href="/user/loans"
            className="p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-sm font-medium text-zinc-900">View Loans</div>
            <div className="text-xs text-zinc-500">Track loan status</div>
          </a>

          <a
            href="/user/reports"
            className="p-4 border rounded-lg hover:bg-zinc-50 text-center"
          >
            <div className="text-sm font-medium text-zinc-900">View Reports</div>
            <div className="text-xs text-zinc-500">Access data reports</div>
          </a>
        </div>
      </div>
    </div>
  );
}