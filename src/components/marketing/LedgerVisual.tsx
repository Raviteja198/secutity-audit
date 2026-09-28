import { Fragment } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

// paid = filled emerald dot, pending = hollow amber ring, upcoming = faint slot.
// Shape differs with color so state is never color-alone.
type Cell = "paid" | "pending" | "upcoming";

const ROWS: Array<{ initials: string; name: string; cells: Cell[] }> = [
  { initials: "MR", name: "Musku Raviteja", cells: ["paid", "paid", "paid", "paid", "paid", "paid", "pending"] },
  { initials: "AN", name: "Arjun Nair", cells: ["paid", "paid", "paid", "paid", "paid", "paid", "paid"] },
  { initials: "PM", name: "Priya Menon", cells: ["paid", "paid", "pending", "paid", "paid", "paid", "pending"] },
  { initials: "KI", name: "Karthik Iyer", cells: ["paid", "paid", "paid", "paid", "pending", "paid", "paid"] },
  { initials: "DS", name: "Divya Shah", cells: ["paid", "paid", "paid", "paid", "paid", "pending", "upcoming"] },
];

// Fund growth, Jan → Jul (₹ thousands): 12, 24, 35, 48, 58, 71, 84.5
const SPARK_POINTS = "0,56 40,44 80,33 120,20 160,10 200,-3 240,-16";
const SPARK_AREA = `0,56 40,44 80,33 120,20 160,10 200,-3 240,-16 240,64 0,64`;

export function LedgerVisual() {
  return (
    <div className="relative select-none" aria-hidden="true">
      {/* Main ledger card */}
      <div className="app-shell rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 mb-0.5">Group ledger</p>
            <p className="text-sm font-semibold text-white/85">Monthly contributions · 2026</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Paid
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full border-[1.5px] border-amber-400" /> Due
            </span>
          </div>
        </div>

        {/* Month header */}
        <div className="grid grid-cols-[2.5rem_repeat(7,1fr)] gap-y-2.5 items-center">
          <span />
          {MONTHS.map((m, i) => (
            <span
              key={m}
              className={`text-center text-[9px] uppercase tracking-wider ${i === 6 ? "text-violet-300/80 font-semibold" : "text-white/30"}`}
            >
              {m}
            </span>
          ))}

          {ROWS.map((row, r) => (
            <Fragment key={row.initials}>
              <span className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-md bg-white/[0.07] border border-white/10 text-[9px] font-semibold text-white/60 flex items-center justify-center">
                  {row.initials}
                </span>
              </span>
              {row.cells.map((cell, c) => (
                <span key={`${r}-${c}`} className="flex items-center justify-center">
                  {cell === "paid" && (
                    <span
                      className="ledger-dot w-3.5 h-3.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(16,185,129,0.45)]"
                      style={{ animationDelay: `${(r * 7 + c) * 60}ms` }}
                    />
                  )}
                  {cell === "pending" && (
                    <span
                      className="ledger-dot w-3.5 h-3.5 rounded-full border-[1.5px] border-amber-400/90"
                      style={{ animationDelay: `${(r * 7 + c) * 60}ms` }}
                    />
                  )}
                  {cell === "upcoming" && <span className="w-3.5 h-3.5 rounded-full bg-white/[0.05]" />}
                </span>
              ))}
            </Fragment>
          ))}
        </div>

        {/* Fund growth sparkline */}
        <div className="mt-5 pt-4 border-t border-white/[0.07]">
          <div className="flex items-end justify-between mb-1.5">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">Group fund</p>
            <p className="text-lg font-bold text-white/90 leading-none">
              ₹84,500
              <span className="ml-1.5 text-[10px] font-medium text-emerald-400 align-middle">▲ 19% this month</span>
            </p>
          </div>
          <svg viewBox="0 -20 240 84" className="w-full h-14 overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={SPARK_AREA} fill="url(#spark-fill)" />
            <polyline
              points={SPARK_POINTS}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="spark-line"
            />
            <circle cx="240" cy="-16" r="3.5" fill="#60a5fa" stroke="#0d1120" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Floating: reminder chip */}
      <div className="chip-float absolute -left-3 sm:-left-8 bottom-[26%] rounded-xl border border-white/15 bg-[rgba(13,17,32,0.95)] px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xl">
        <span className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-8 4h5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/85">Reminder sent</p>
          <p className="text-[9px] text-white/40">WhatsApp · 3 days before due</p>
        </div>
      </div>

      {/* Floating: receipt chip */}
      <div className="chip-float-delayed absolute -right-2 sm:-right-6 -bottom-4 rounded-xl border border-white/15 bg-[rgba(13,17,32,0.95)] px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xl">
        <span className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.5-2v12a2 2 0 01-2 2h-9a2 2 0 01-2-2V6a2 2 0 012-2h9a2 2 0 012 2z" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/85">Receipt #R-0142</p>
          <p className="text-[9px] text-white/40">₹2,000 · recorded just now</p>
        </div>
      </div>
    </div>
  );
}
