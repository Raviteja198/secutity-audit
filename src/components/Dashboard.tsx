"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { DatePicker, DateSelection, formatLabel } from "@/components/ui/DatePicker";

type AdminDashboardSummary = {
  totalMembers: number;
  inactiveMembers: number;
  monthlyCollections: number;
  monthlyPaidCount: number;
  monthlyLateCount: number;
  monthlyPendingCount: number;
  pendingPayments: number;
  activeLoans: number;
  overdueLoans: number;
  pendingApprovalLoans: number;
  fundBalance: number;
};

type AdminDashboardHighlights = {
  totalCollections: number;
  yearToDateCollections: number;
  totalCharity: number;
  totalLoansDisbursed: number;
  activeLoanAmount: number;
  closedLoans: number;
  totalInterestCollected: number;
  totalInHand: number;
};

type AdminDashboardCharts = {
  monthlyTrend: { month: string; year: number; amount: number }[];
  statusTrend: { month: string; paid: number; late: number; pending: number }[];
};

function fmt(paise: number) {
  const rupees = paise / 100;
  if (rupees >= 100_000) return `₹${(rupees / 100_000).toFixed(2)}L`;
  if (rupees >= 1_000) return `₹${(rupees / 1_000).toFixed(1)}K`;
  return `₹${rupees.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function fmtFull(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

function StatSkeleton({ small }: { small?: boolean }) {
  return (
    <div
      className={`rounded-2xl animate-pulse ${small ? "p-3" : "p-4 sm:p-5"}`}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className={`bg-white/8 rounded-lg mb-3 ${small ? "w-6 h-6" : "w-8 h-8"}`} />
      <div className="h-2.5 w-20 rounded-full bg-white/7 mb-2" />
      <div className={`rounded-lg bg-white/8 ${small ? "h-5 w-16" : "h-7 w-24"}`} />
    </div>
  );
}

function ChartSkeleton({ height = 260 }: { height?: number }) {
  return <div className="w-full rounded-xl bg-white/3 animate-pulse" style={{ height }} />;
}

function CustomTooltip({ active, payload, label, valueFormat = fmtFull }: {
  active?: boolean;
  payload?: { value: number; name?: string; color?: string }[];
  label?: string;
  valueFormat?: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2.5 text-xs shadow-xl"
      style={{ background: "rgba(10,14,28,0.97)", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <p className="text-white/50 mb-1.5 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-white/70 capitalize">{p.name}:</span>
          <span className="font-semibold text-white">{valueFormat(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

function defaultSel(): DateSelection {
  const n = new Date();
  return { mode: "month", month: n.getMonth() + 1, year: n.getFullYear() };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error ?? "Failed to fetch dashboard data");
  return json as T;
}

export function Dashboard() {
  const now = new Date();
  const lastLoadedQueryRef = useRef<string | null>(null);
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
  const [highlights, setHighlights] = useState<AdminDashboardHighlights | null>(null);
  const [charts, setCharts] = useState<AdminDashboardCharts | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [highlightsLoading, setHighlightsLoading] = useState(true);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sel, setSel] = useState<DateSelection>(defaultSel);
  const [refreshKey, setRefresh] = useState(0);

  const quarter = sel.mode === "quarter" ? sel.quarter : undefined;
  const year = sel.year;
  const isCurrentPeriod = sel.mode === "month" && sel.month === now.getMonth() + 1 && sel.year === now.getFullYear();

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set("mode", sel.mode);
    p.set("year", String(sel.year));
    if (sel.mode === "month") p.set("month", String(sel.month));
    if (sel.mode === "quarter") p.set("quarter", String(sel.quarter));
    p.set("_", String(refreshKey));
    return p.toString();
  }, [sel, refreshKey]);

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      setSummary(await fetchJson<AdminDashboardSummary>(`/api/admin/dashboard?${query}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard summary");
    } finally {
      setSummaryLoading(false);
    }
  }, [query, setSummaryLoading, setSummary, setError]);

  const loadHighlights = useCallback(async () => {
    setHighlightsLoading(true);
    try {
      setHighlights(await fetchJson<AdminDashboardHighlights>(`/api/admin/dashboard/highlights?${query}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard highlights");
    } finally {
      setHighlightsLoading(false);
    }
  }, [query, setHighlightsLoading, setHighlights, setError]);

  const loadCharts = useCallback(async () => {
    setChartsLoading(true);
    try {
      setCharts(await fetchJson<AdminDashboardCharts>(`/api/admin/dashboard/charts?${query}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard charts");
    } finally {
      setChartsLoading(false);
    }
  }, [query, setChartsLoading, setCharts, setError]);

  const loadAll = useCallback(async (force = false) => {
    if (!force && lastLoadedQueryRef.current === query) return;
    lastLoadedQueryRef.current = query;

    setError(null);
    await loadSummary();
    await loadHighlights();
    await loadCharts();
  }, [loadSummary, loadHighlights, loadCharts, query, setError]);

  useEffect(() => { void loadAll(); }, [loadAll]);

  const summaryBusy = summaryLoading || !summary;
  const highlightsBusy = highlightsLoading || !highlights;
  const chartsBusy = chartsLoading || !charts;
  const anyLoading = summaryLoading || highlightsLoading || chartsLoading;

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-0.5">Overview</p>
          <h1 className="text-xl sm:text-2xl font-bold text-white/90">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <DatePicker value={sel} onChange={setSel} />
          {!isCurrentPeriod && (
            <button
              onClick={() => setSel(defaultSel())}
              className="text-xs px-3 py-2.5 rounded-xl transition flex items-center gap-1.5"
              style={{ background: "rgba(139,92,246,0.12)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.25)" }}
              title="Jump to current month"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Today
            </button>
          )}
          <button
            onClick={() => setRefresh((k) => k + 1)}
            disabled={anyLoading}
            className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition disabled:opacity-40"
            title="Refresh data"
          >
            <svg className={`w-4 h-4 ${anyLoading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-white/35">Showing data for <span className="text-white/65 font-medium">{formatLabel(sel)}</span></span>
        {isCurrentPeriod && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.2)" }}>Current</span>}
        {sel.mode !== "month" && <span className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: "rgba(139,92,246,0.1)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.2)" }}>{sel.mode} view</span>}
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
          <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-red-400">{error}</p>
          <button onClick={() => void loadAll(true)} className="ml-auto text-xs text-red-300 underline">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {summaryBusy ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />) : summary && [
          { label: "Active Members", value: String(summary.totalMembers), sub: `${summary.inactiveMembers} inactive`, gradient: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.12))", border: "rgba(59,130,246,0.25)", color: "#93c5fd", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /> },
          { label: `${formatLabel(sel)} Collections`, value: fmt(summary.monthlyCollections), sub: fmtFull(summary.monthlyCollections), gradient: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.12))", border: "rgba(139,92,246,0.25)", color: "#c4b5fd", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
          { label: "Fund Balance", value: fmt(summary.fundBalance), sub: fmtFull(summary.fundBalance), gradient: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.1))", border: "rgba(245,158,11,0.25)", color: "#fcd34d", icon: <><rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></> },
          { label: "Pending Payments", value: String(summary.monthlyPendingCount), sub: `for ${formatLabel(sel)}`, gradient: "linear-gradient(135deg, rgba(251,146,60,0.2), rgba(245,158,11,0.1))", border: "rgba(251,146,60,0.25)", color: "#fdba74", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
        ].map((card, i) => (
          <div key={i} className="rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:scale-[1.02]" style={{ background: card.gradient, border: `1px solid ${card.border}`, backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", color: card.color }}><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">{card.icon}</svg></div></div>
            <p className="text-[11px] text-white/45 mb-1 leading-tight">{card.label}</p>
            <p className="text-xl sm:text-2xl font-bold tabular-nums" style={{ color: card.color }}>{card.value}</p>
            {card.sub && <p className="text-[10px] text-white/25 mt-1 truncate">{card.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {summaryBusy ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} small />) : summary && [
          { label: sel.mode === "month" ? "Paid This Month" : sel.mode === "quarter" ? `Paid Q${quarter} ${year}` : `Paid in ${year}`, value: String(summary.monthlyPaidCount), color: "#6ee7b7", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
          { label: sel.mode === "month" ? "Late Payments" : "Late / Overdue", value: String(summary.monthlyLateCount), color: "#fdba74", bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
          { label: "Active Loans", value: String(summary.activeLoans), sub: `${summary.pendingApprovalLoans} pending approval`, color: "#5eead4", bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /> },
          { label: "Overdue Loans", value: String(summary.overdueLoans), color: summary.overdueLoans > 0 ? "#fca5a5" : "#6ee7b7", bg: summary.overdueLoans > 0 ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)", border: summary.overdueLoans > 0 ? "rgba(239,68,68,0.18)" : "rgba(16,185,129,0.18)", icon: summary.overdueLoans > 0 ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
        ].map((card, i) => (
          <div key={i} className="rounded-2xl p-3 sm:p-4 transition-all duration-200" style={{ background: card.bg, border: `1px solid ${card.border}` }}>
            <div className="flex items-center gap-2 mb-2"><svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" style={{ color: card.color }}>{card.icon}</svg><p className="text-[10px] sm:text-[11px] text-white/40 leading-tight truncate">{card.label}</p></div>
            <p className="text-xl font-bold tabular-nums" style={{ color: card.color }}>{card.value}</p>
            {card.sub && <p className="text-[10px] text-white/25 mt-0.5 truncate">{card.sub}</p>}
          </div>
        ))}
      </div>

      {highlightsBusy ? <ChartSkeleton height={160} /> : highlights && (
        <div className="rounded-2xl p-4 sm:p-5 space-y-4" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.06))", border: "1px solid rgba(139,92,246,0.18)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)", color: "#c4b5fd" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-white/80">All-Time Financial Overview</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { label: "Total Collections", value: fmtFull(highlights.totalCollections), color: "#6ee7b7", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
              { label: "Total In Hand", value: fmtFull(highlights.totalInHand), color: "#5eead4", bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
              { label: "Total Charity", value: fmtFull(highlights.totalCharity), color: "#f9a8d4", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /> },
              { label: "Active Loan Amount", value: fmtFull(highlights.activeLoanAmount), color: "#c4b5fd", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.18)", icon: <><rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></> },
            ].map((card) => (
              <div key={card.label} className="rounded-xl p-3 sm:p-4 transition-all duration-200" style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" style={{ color: card.color }}>{card.icon}</svg>
                  <span className="text-[10px] sm:text-[11px] text-white/40 leading-tight truncate">{card.label}</span>
                </div>
                <p className="text-base sm:text-lg font-bold tabular-nums truncate" style={{ color: card.color }}>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 pt-1">
            <div className="flex flex-col min-w-0"><span className="text-[10px] text-white/30 uppercase tracking-wide">YTD Collections</span><span className="text-sm font-semibold tabular-nums" style={{ color: "#c4b5fd" }}>{fmtFull(highlights.yearToDateCollections)}</span></div>
            <div className="flex flex-col min-w-0"><span className="text-[10px] text-white/30 uppercase tracking-wide">Closed Loans</span><span className="text-sm font-semibold tabular-nums" style={{ color: "#5eead4" }}>{String(highlights.closedLoans)}</span></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
        <div className="xl:col-span-3 rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-4"><div><h2 className="text-sm font-semibold text-white/80">{sel.mode === "month" ? "12-Month" : sel.mode === "quarter" ? "8-Quarter" : "5-Year"} Collections Trend</h2><p className="text-[11px] text-white/30 mt-0.5">Ending {formatLabel(sel)}</p></div></div>
          {chartsBusy ? <ChartSkeleton height={220} /> : <div className="w-full" style={{ height: "clamp(180px, 28vw, 260px)" }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={charts?.monthlyTrend ?? []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}><defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} /></linearGradient><linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} interval="preserveStartEnd" /><YAxis tickFormatter={(v) => v ? fmt(v) : "₹0"} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} width={56} /><Tooltip content={<CustomTooltip valueFormat={fmtFull} />} cursor={{ stroke: "rgba(139,92,246,0.25)", strokeWidth: 1.5 }} /><Area type="monotone" dataKey="amount" name="Collections" stroke="url(#lineGradient)" strokeWidth={2.5} fill="url(#areaGradient)" dot={false} activeDot={{ r: 5, fill: "#8b5cf6", stroke: "#1e1b4b", strokeWidth: 2 }} /></AreaChart></ResponsiveContainer></div>}
        </div>

        <div className="xl:col-span-2 rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="mb-4"><h2 className="text-sm font-semibold text-white/80">Payment Status ({sel.mode === "month" ? "6 Months" : sel.mode === "quarter" ? "4 Quarters" : "4 Years"})</h2><p className="text-[11px] text-white/30 mt-0.5">Count of payments by status</p></div>
          {chartsBusy ? <ChartSkeleton height={220} /> : <div className="w-full" style={{ height: "clamp(180px, 28vw, 260px)" }}><ResponsiveContainer width="100%" height="100%"><BarChart data={charts?.statusTrend ?? []} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barSize={8} barGap={2}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} /><YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} allowDecimals={false} /><Tooltip content={<CustomTooltip valueFormat={(v) => String(v)} />} cursor={{ fill: "rgba(255,255,255,0.03)" }} /><Legend wrapperStyle={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", paddingTop: "8px" }} iconType="circle" iconSize={7} /><Bar dataKey="paid" name="Paid" fill="#6ee7b7" radius={[3, 3, 0, 0]} /><Bar dataKey="late" name="Late" fill="#fdba74" radius={[3, 3, 0, 0]} /><Bar dataKey="pending" name="Pending" fill="#818cf8" radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></div>}
        </div>
      </div>

      {!summaryBusy && summary && (summary.monthlyPaidCount + summary.monthlyLateCount + summary.monthlyPendingCount > 0) && (() => {
        const total = summary.monthlyPaidCount + summary.monthlyLateCount + summary.monthlyPendingCount;
        const paidPct = Math.round((summary.monthlyPaidCount / total) * 100);
        const latePct = Math.round((summary.monthlyLateCount / total) * 100);
        const pendPct = 100 - paidPct - latePct;
        return <div className="rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between mb-3"><h2 className="text-sm font-semibold text-white/80">Payment Completion — {formatLabel(sel)}</h2><span className="text-xs text-white/30">{total} total</span></div><div className="flex rounded-full overflow-hidden h-2.5 mb-3" style={{ background: "rgba(255,255,255,0.06)" }}><div className="h-full transition-all duration-500" style={{ width: `${paidPct}%`, background: "#6ee7b7" }} /><div className="h-full transition-all duration-500" style={{ width: `${latePct}%`, background: "#fdba74" }} /><div className="h-full transition-all duration-500" style={{ width: `${pendPct}%`, background: "#818cf8" }} /></div><div className="flex flex-wrap gap-4">{[{ label: "Paid", count: summary.monthlyPaidCount, pct: paidPct, color: "#6ee7b7" }, { label: "Late", count: summary.monthlyLateCount, pct: latePct, color: "#fdba74" }, { label: "Pending", count: summary.monthlyPendingCount, pct: pendPct, color: "#818cf8" }].map((s) => <div key={s.label} className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} /><span className="text-xs text-white/50">{s.label}</span><span className="text-xs font-semibold" style={{ color: s.color }}>{s.count}</span><span className="text-[10px] text-white/25">({s.pct}%)</span></div>)}</div></div>;
      })()}

      <div className="rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <h2 className="text-sm font-semibold text-white/80 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {[
            { href: "/admin/members", label: "Members", sub: "Add, edit, manage", color: "#93c5fd", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z" /> },
            { href: "/admin/payments", label: "Payments", sub: "Record contributions", color: "#c4b5fd", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.18)", icon: <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" /> },
            { href: "/admin/loans", label: "Loans", sub: "Approve & track", color: "#6ee7b7", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /> },
            { href: "/admin/reports", label: "Reports", sub: "Exports & analytics", color: "#fcd34d", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.18)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6 20V10m6 10V4m6 16v-6" /> },
          ].map((item) => (
            <a key={item.href} href={item.href} className="group flex flex-col gap-2 rounded-xl p-3 sm:p-4 transition-all duration-200 hover:scale-[1.02]" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: item.color }}><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">{item.icon}</svg></div>
              <div className="text-sm font-semibold leading-tight" style={{ color: item.color }}>{item.label}</div>
              <div className="text-[10px] sm:text-xs text-white/30">{item.sub}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
