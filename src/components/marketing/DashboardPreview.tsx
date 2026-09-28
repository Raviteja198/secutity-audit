// Illustrated avatar — a silhouette glyph, not a photo of a real person.
function Avatar({ from, to }: { from: string; to: string }) {
  return (
    <span
      className="w-9 h-9 rounded-full shrink-0 overflow-hidden ring-2 ring-white/20"
      style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}
    >
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <circle cx="18" cy="13.5" r="5.6" fill="rgba(255,255,255,0.9)" />
        <path d="M6.5 33c0-6.4 5.2-10.2 11.5-10.2S29.5 26.6 29.5 33z" fill="rgba(255,255,255,0.9)" />
      </svg>
    </span>
  );
}

// Sample rows shown in the marketing preview — figures are illustrative.
const MEMBERS = [
  { name: "Musku Raviteja", role: "Treasurer", paid: true, from: "#f472b6", to: "#c026d3" },
  { name: "Arjun Nair", role: "Member", paid: true, from: "#38bdf8", to: "#4f46e5" },
  { name: "Priya Menon", role: "Member", paid: true, from: "#fbbf24", to: "#f97316" },
  { name: "Karthik Iyer", role: "Member", paid: false, from: "#34d399", to: "#0d9488" },
];

// Monthly collections, ₹ thousands — Jan → Jul
const BARS = [
  { month: "Jan", received: 34, pending: 8 },
  { month: "Feb", received: 38, pending: 6 },
  { month: "Mar", received: 41, pending: 9 },
  { month: "Apr", received: 45, pending: 5 },
  { month: "May", received: 48, pending: 6 },
  { month: "Jun", received: 52, pending: 4 },
  { month: "Jul", received: 56, pending: 7 },
];

const MAX = 64;

const AUDIT = [
  { who: "Musku Raviteja", what: "recorded a ₹2,000 payment", when: "2m ago" },
  { who: "System", what: "sent 14 WhatsApp reminders", when: "1h ago" },
  { who: "Arjun Nair", what: "approved loan #L-0031", when: "3h ago" },
];

export function DashboardPreview() {
  return (
    <div className="frost-card !rounded-2xl p-4 sm:p-5" aria-hidden="true">
      {/* Window chrome */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-[10px] font-bold text-white">
            YM
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-white">Welcome back, admin</p>
            <p className="text-[10px] text-indigo-100/55">Your association at a glance</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-100 text-[10px] font-semibold">
          All dues on track
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Members roster */}
        <div className="lg:col-span-2 frost-inset p-4 flex flex-col">
          <div className="flex items-baseline justify-between mb-3.5">
            <p className="text-[10px] uppercase tracking-[0.14em] text-indigo-100/50">Members</p>
            <p className="text-sm font-bold text-white">
              17 <span className="text-[10px] font-medium text-indigo-100/50">active</span>
            </p>
          </div>
          <ul className="space-y-2.5">
            {MEMBERS.map((m) => (
              <li key={m.name} className="flex items-center gap-2.5">
                <Avatar from={m.from} to={m.to} />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-white truncate">{m.name}</span>
                  <span className="block text-[10px] text-indigo-100/50">{m.role}</span>
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    m.paid
                      ? "bg-emerald-400/20 border-emerald-300/40 text-emerald-100"
                      : "bg-amber-400/20 border-amber-300/40 text-amber-100"
                  }`}
                >
                  {m.paid ? "PAID" : "DUE"}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <span className="flex -space-x-2">
                {["#a78bfa", "#f472b6", "#38bdf8"].map((c) => (
                  <span
                    key={c}
                    className="w-6 h-6 rounded-full ring-2 ring-[#241a52] overflow-hidden"
                    style={{ background: c }}
                  >
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <circle cx="18" cy="13.5" r="5.6" fill="rgba(255,255,255,0.9)" />
                      <path d="M6.5 33c0-6.4 5.2-10.2 11.5-10.2S29.5 26.6 29.5 33z" fill="rgba(255,255,255,0.9)" />
                    </svg>
                  </span>
                ))}
              </span>
              <span className="text-[10px] text-indigo-100/55">+13 more members</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-3 space-y-4">
          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="frost-inset p-3.5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-indigo-100/50 mb-1">Received</p>
              <p className="text-xl font-bold text-white leading-none">₹56,000</p>
              <p className="text-[10px] text-emerald-200 mt-1.5">▲ 8% vs last month</p>
            </div>
            <div className="frost-inset p-3.5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-indigo-100/50 mb-1">Pending</p>
              <p className="text-xl font-bold text-white leading-none">₹7,000</p>
              <p className="text-[10px] text-amber-200 mt-1.5">3 members · reminders sent</p>
            </div>
          </div>

          {/* Monthly collections bar chart */}
          <div className="frost-inset p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-indigo-100/50">
                Monthly collections
              </p>
              <div className="flex items-center gap-3 text-[9px] text-indigo-100/60">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-[2px] bg-[#34d399]" /> Received
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-[2px] bg-[#fbbf24]" /> Pending
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-1.5 sm:gap-2">
              {BARS.map((b, i) => {
                const rh = (b.received / MAX) * 100;
                const ph = (b.pending / MAX) * 100;
                const isLast = i === BARS.length - 1;
                return (
                  <div key={b.month} className="flex-1 flex flex-col items-center">
                    <span
                      className={`text-[9px] font-semibold mb-1 ${
                        isLast ? "text-white" : "text-transparent"
                      }`}
                    >
                      ₹{b.received}k
                    </span>
                    <div className="w-full h-24 flex flex-col justify-end gap-[2px]">
                      <div className="w-full rounded-t-[4px] bg-[#fbbf24]" style={{ height: `${ph}%` }} />
                      <div className="w-full rounded-t-[4px] bg-[#34d399]" style={{ height: `${rh}%` }} />
                    </div>
                    <span className="text-[9px] text-indigo-100/45 mt-1.5">{b.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audit log */}
          <div className="frost-inset p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] text-indigo-100/50 mb-2.5">
              Audit log
            </p>
            <ul className="space-y-2">
              {AUDIT.map((a) => (
                <li key={a.what} className="flex items-center gap-2.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                  <span className="min-w-0 flex-1 truncate text-indigo-50/80">
                    <span className="font-semibold text-white">{a.who}</span> {a.what}
                  </span>
                  <span className="text-[10px] text-indigo-100/40 shrink-0">{a.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
