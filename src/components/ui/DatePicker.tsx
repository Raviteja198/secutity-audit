"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DateMode = "month" | "quarter" | "year";

export type DateSelection =
  | { mode: "month"; month: number; year: number }
  | { mode: "quarter"; quarter: 1 | 2 | 3 | 4; year: number }
  | { mode: "year"; year: number };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL  = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const QUARTER_LABELS = { 1: "Jan – Mar", 2: "Apr – Jun", 3: "Jul – Sep", 4: "Oct – Dec" };

export function formatLabel(sel: DateSelection): string {
  if (sel.mode === "month") return `${MONTH_FULL[sel.month - 1]} ${sel.year}`;
  if (sel.mode === "quarter") return `Q${sel.quarter} ${sel.year}`;
  return String(sel.year);
}

function currentQuarter(): 1 | 2 | 3 | 4 {
  return Math.ceil((new Date().getMonth() + 1) / 3) as 1 | 2 | 3 | 4;
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

export function DatePicker({
  value,
  onChange,
}: {
  value: DateSelection;
  onChange: (sel: DateSelection) => void;
}) {
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const nowYear = now.getFullYear();
  const nowQuarter = currentQuarter();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<DateMode>(value.mode);
  const [navYear, setNavYear] = useState(value.year);
  const rootRef = useRef<HTMLDivElement>(null);

  const YEAR_OPTIONS = Array.from({ length: 12 }, (_, i) => navYear - 5 + i);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function open_picker() {
    setNavYear(value.year);
    setView(value.mode);
    setOpen(true);
  }

  function applyPreset(preset: "thisMonth" | "lastMonth" | "thisQuarter" | "thisYear") {
    let sel: DateSelection;
    if (preset === "thisMonth") {
      sel = { mode: "month", month: nowMonth, year: nowYear };
    } else if (preset === "lastMonth") {
      const m = nowMonth === 1 ? 12 : nowMonth - 1;
      const y = nowMonth === 1 ? nowYear - 1 : nowYear;
      sel = { mode: "month", month: m, year: y };
    } else if (preset === "thisQuarter") {
      sel = { mode: "quarter", quarter: nowQuarter, year: nowYear };
    } else {
      sel = { mode: "year", year: nowYear };
    }
    onChange(sel);
    setOpen(false);
  }

  function selectMonth(month: number) {
    onChange({ mode: "month", month, year: navYear });
    setOpen(false);
  }

  function selectQuarter(q: 1 | 2 | 3 | 4) {
    onChange({ mode: "quarter", quarter: q, year: navYear });
    setOpen(false);
  }

  function selectYear(y: number) {
    onChange({ mode: "year", year: y });
    setOpen(false);
  }

  function isSelected(cell: DateSelection) {
    if (cell.mode !== value.mode) return false;
    if (cell.mode === "month" && value.mode === "month")
      return cell.month === value.month && cell.year === value.year;
    if (cell.mode === "quarter" && value.mode === "quarter")
      return cell.quarter === value.quarter && cell.year === value.year;
    return cell.year === value.year;
  }

  const cellStyle = (active: boolean, current: boolean): React.CSSProperties => ({
    background: active
      ? "linear-gradient(135deg, rgba(59,130,246,0.55), rgba(139,92,246,0.55))"
      : current
      ? "rgba(139,92,246,0.14)"
      : "rgba(255,255,255,0.04)",
    color: active ? "#fff" : current ? "#c4b5fd" : "rgba(255,255,255,0.58)",
    border: active
      ? "1px solid rgba(139,92,246,0.65)"
      : current
      ? "1px solid rgba(139,92,246,0.28)"
      : "1px solid rgba(255,255,255,0.06)",
  });

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : open_picker())}
        className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-200 select-none"
        style={{
          background: open ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.07)",
          border: open ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.14)",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <span>{formatLabel(value)}</span>
      </button>

      {open && (
        <div
          className="absolute mt-2 z-[200] rounded-2xl shadow-2xl overflow-hidden w-[min(304px,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] left-0 right-auto sm:left-auto sm:right-0 origin-top-left sm:origin-top-right"
          style={{
            background: "rgba(8,11,22,0.97)",
            border: "1px solid rgba(255,255,255,0.11)",
            backdropFilter: "blur(24px)",
            top: "calc(100% + 6px)",
          }}
        >
          <div className="p-3">
            {view === "month" && (
              <div className="grid grid-cols-3 gap-1.5">
                {MONTH_SHORT.map((label, i) => {
                  const month = i + 1;
                  const active = isSelected({ mode: "month", month, year: navYear });
                  const current = month === nowMonth && navYear === nowYear;
                  return (
                    <button
                      key={label}
                      onClick={() => selectMonth(month)}
                      className="py-2 rounded-xl text-xs"
                      style={cellStyle(active, current)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}