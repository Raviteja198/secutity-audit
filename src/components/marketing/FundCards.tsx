function Chip() {
  return (
    <svg className="w-9 h-7" viewBox="0 0 36 28" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="34" height="26" rx="5" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" />
      <path d="M12 1v26M24 1v26M1 10h34M1 18h34" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
    </svg>
  );
}

export function FundCards() {
  return (
    <div className="relative h-[380px] sm:h-[440px] select-none" aria-hidden="true">
      {/* Glowing coral orb behind the cards */}
      <div className="absolute right-[-10%] top-[8%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(251,113,133,0.85),rgba(236,72,153,0.45)_55%,transparent_75%)] blur-[2px] orb-glow" />
      <div className="absolute left-[6%] bottom-[4%] w-24 h-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(251,146,60,0.8),rgba(225,29,72,0.5)_70%,transparent_100%)]" />
      <div className="absolute right-[4%] top-[2%] w-5 h-5 rounded-full bg-pink-300/80" />
      <div className="absolute left-[16%] top-[12%] w-3 h-3 rounded-full bg-indigo-300/70" />
      <div className="absolute right-[30%] bottom-[-2%] w-8 h-8 rounded-full bg-indigo-900/80" />

      {/* Back card — payment receipt */}
      <div className="chip-float-delayed absolute right-[2%] bottom-[6%] w-[280px] sm:w-[330px] rotate-[9deg] rounded-2xl border border-white/30 bg-gradient-to-br from-pink-300/25 via-fuchsia-300/15 to-indigo-300/10 backdrop-blur-xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between mb-6">
          <Chip />
          <span className="px-2.5 py-1 rounded-full bg-emerald-400/25 border border-emerald-300/40 text-emerald-100 text-[10px] font-bold tracking-wide">
            PAID
          </span>
        </div>
        <p className="font-mono text-xl sm:text-2xl text-white/95 tracking-[0.12em] mb-5">₹2,000.00</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.16em] text-white/50 mb-0.5">Card holder</p>
            <p className="text-sm font-semibold text-white/90">Musku Raviteja</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.16em] text-white/50 mb-0.5">Receipt</p>
            <p className="text-sm font-mono text-white/90">#R-0142</p>
          </div>
        </div>
      </div>

      {/* Front card — group fund */}
      <div className="chip-float absolute left-[2%] top-[6%] w-[300px] sm:w-[360px] rotate-[-7deg] rounded-2xl border border-white/35 bg-gradient-to-br from-indigo-300/30 via-violet-300/20 to-pink-300/15 backdrop-blur-2xl p-6 shadow-[0_35px_70px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between mb-7">
          <Chip />
          <span className="text-[11px] font-bold italic tracking-wider text-white/85">YM</span>
        </div>
        <p className="font-mono text-2xl sm:text-3xl text-white tracking-[0.14em] mb-6">₹ 84,500</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.16em] text-white/55 mb-0.5">Group fund</p>
            <p className="text-sm font-semibold text-white/95">People&apos;s Youth Association</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.16em] text-white/55 mb-0.5">This month</p>
            <p className="text-sm font-mono text-emerald-200">▲ 19%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
