"use client";

export function TermsConditions() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2))", border: "1px solid rgba(139,92,246,0.3)" }}>
          <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white/90">Group Terms &amp; Conditions</h1>
        <p className="text-sm text-white/40">People&apos;s Youth — Financial &amp; Activity Guidelines</p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <Section number="1" title="Monthly Contribution" color="#93c5fd" bg="rgba(59,130,246,0.08)" border="rgba(59,130,246,0.18)">
          <ul className="space-y-2.5">
            <Li>Every member must pay their monthly contribution between <strong className="text-white/80">5th of every month, 7:00 PM to 9:00 PM</strong>.</Li>
            <Li>The contribution amount will be decided by the Admin and may change over time.</Li>
            <Li>Any changes in contribution amount will apply only to future months.</Li>
          </ul>
        </Section>

        <Section number="2" title="Late Payment & Penalties" color="#fca5a5" bg="rgba(239,68,68,0.06)" border="rgba(239,68,68,0.15)">
          <ul className="space-y-2.5">
            <Li>If a member fails to pay within the specified time, a <strong className="text-white/80">late fine of ₹100</strong> will be applied.</Li>
            <Li>If the payment is delayed up to <strong className="text-white/80">5 days</strong>, the fine will continue as per rules set by Admin.</Li>
            <Li>If payment is not made within <strong className="text-white/80">10 days</strong>, the member may be <strong className="text-white/80">removed from the group</strong>.</Li>
            <Li>In case of removal: All previously paid contributions will be <strong className="text-white/80">non-refundable</strong>.</Li>
          </ul>
        </Section>

        <Section number="3" title="Meeting Attendance" color="#fdba74" bg="rgba(251,146,60,0.06)" border="rgba(251,146,60,0.15)">
          <ul className="space-y-2.5">
            <Li>If a meeting is conducted by the <strong className="text-white/80">Group Leader or Co-Leader</strong>, attendance is <strong className="text-white/80">mandatory</strong>.</Li>
            <Li>If a member fails to attend, a <strong className="text-white/80">fine of ₹500</strong> will be imposed.</Li>
            <Li>Exception: Fine will not be applied if the member informs in advance and provides a <strong className="text-white/80">valid emergency reason</strong>.</Li>
          </ul>
        </Section>

        <Section number="4" title="Loan Rules" color="#5eead4" bg="rgba(20,184,166,0.06)" border="rgba(20,184,166,0.15)">
          <ul className="space-y-2.5">
            <Li>Loans are provided only to active group members.</Li>
            <Li>Interest rate will be decided by the Admin at the time of loan approval.</Li>
            <Li>Interest will be calculated on a <strong className="text-white/80">monthly basis</strong> until full repayment.</Li>
            <Li>Members must repay loans within the agreed duration.</Li>
            <Li>Delay in repayment will result in <strong className="text-white/80">additional interest or penalties</strong> as defined by Admin.</Li>
          </ul>
        </Section>

        <Section number="5" title="Charity Usage" color="#f9a8d4" bg="rgba(236,72,153,0.06)" border="rgba(236,72,153,0.15)">
          <ul className="space-y-2.5">
            <Li>Group funds may be used for charity — monthly, quarterly, or on special occasions.</Li>
            <Li>Decisions regarding charity will be made by Admin/Leaders.</Li>
            <Li>All charity transactions will be recorded and visible to members for transparency.</Li>
          </ul>
        </Section>

        <Section number="6" title="Transparency & Records" color="#c4b5fd" bg="rgba(139,92,246,0.06)" border="rgba(139,92,246,0.15)">
          <ul className="space-y-2.5">
            <Li>All financial transactions will be recorded in the system.</Li>
            <Li>Members have the right to view: Contributions, Loans, Charity expenses, and Group balance.</Li>
          </ul>
        </Section>

        <Section number="7" title="Member Responsibilities" color="#6ee7b7" bg="rgba(16,185,129,0.06)" border="rgba(16,185,129,0.15)">
          <ul className="space-y-2.5">
            <Li>Members must: Pay contributions on time, follow group rules, and maintain discipline and cooperation.</Li>
            <Li>Any misuse of funds or violation of rules may result in: Penalty, Suspension, or Removal from the group.</Li>
          </ul>
        </Section>

        <Section number="8" title="Admin Authority" color="#fcd34d" bg="rgba(245,158,11,0.06)" border="rgba(245,158,11,0.15)">
          <ul className="space-y-2.5">
            <Li>Admins have the authority to: Update contribution amounts, modify penalty rules, approve loans, and take disciplinary actions.</Li>
            <Li>Any rule changes will not affect past records.</Li>
          </ul>
        </Section>

        <Section number="9" title="Amendments" color="#818cf8" bg="rgba(99,102,241,0.06)" border="rgba(99,102,241,0.15)">
          <ul className="space-y-2.5">
            <Li>These terms and conditions may be updated when necessary.</Li>
            <Li>Members will be informed of any changes.</Li>
          </ul>
        </Section>

        <Section number="10" title="Final Agreement" color="#93c5fd" bg="rgba(59,130,246,0.08)" border="rgba(59,130,246,0.18)">
          <p className="text-sm text-white/55 leading-relaxed">
            By being part of the group, every member agrees to follow all the above rules and regulations.
          </p>
        </Section>
      </div>

      {/* Footer quote */}
      <div className="text-center py-6">
        <div className="inline-block rounded-2xl px-8 py-4"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08))", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-base sm:text-lg font-semibold italic" style={{ color: "#c4b5fd" }}>
            &ldquo;Together We Give, Together We Grow.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ number, title, color, bg, border, children }: {
  number: string;
  title: string;
  color: string;
  bg: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-4 sm:p-5 transition-all duration-200"
      style={{ background: bg, border: `1px solid ${border}` }}>
      <div className="flex items-center gap-3 mb-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
          style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
          {number}
        </span>
        <h2 className="text-sm sm:text-base font-semibold" style={{ color }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-white/50 leading-relaxed">
      <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0 mt-2" />
      <span>{children}</span>
    </li>
  );
}
