"use client";

export function PrivacyPolicy() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2))", border: "1px solid rgba(139,92,246,0.3)" }}>
          <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white/90">Privacy Policy</h1>
        <p className="text-sm text-white/40">People&apos;s Youth Association</p>
        <p className="text-xs text-white/25">Last updated: July 2026</p>
        <p className="text-[11px] text-white/20 max-w-md mx-auto pt-1">
          This app is under development and is not the final source of truth — please contact
          your organiser to get full confirmation.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <Section number="1" title="Introduction" color="#93c5fd" bg="rgba(59,130,246,0.08)" border="rgba(59,130,246,0.18)">
          <p className="text-sm text-white/55 leading-relaxed">
            This Privacy Policy explains how People&apos;s Youth Association (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the group&rdquo;)
            collects, uses, stores, and protects information about members and admins who use this
            application to manage contributions, loans, and charity activities.
          </p>
        </Section>

        <Section number="2" title="Information We Collect" color="#fca5a5" bg="rgba(239,68,68,0.06)" border="rgba(239,68,68,0.15)">
          <ul className="space-y-2.5">
            <Li><strong className="text-white/80">Personal details:</strong> full name, phone number, email address, and residential address provided when a membership profile is created.</Li>
            <Li><strong className="text-white/80">Account credentials:</strong> your login email and a securely hashed password (we never store passwords in plain text).</Li>
            <Li><strong className="text-white/80">Financial records:</strong> monthly contribution payments, penalties, loan applications, repayments, and charity contributions/disbursements associated with your membership.</Li>
            <Li><strong className="text-white/80">Activity records:</strong> login timestamps and admin actions taken on your account (e.g. payments recorded, loans approved), kept for audit and transparency purposes.</Li>
          </ul>
        </Section>

        <Section number="3" title="How We Use Your Information" color="#fdba74" bg="rgba(251,146,60,0.06)" border="rgba(251,146,60,0.15)">
          <ul className="space-y-2.5">
            <Li>To maintain accurate records of contributions, loans, and charity activity for the group.</Li>
            <Li>To generate and email payment receipts and one-time passwords (OTPs) for login and password resets.</Li>
            <Li>To calculate dues, penalties, loan interest, and group fund balances.</Li>
            <Li>To communicate important updates about your account or the group&apos;s activities.</Li>
          </ul>
        </Section>

        <Section number="4" title="Data Storage & Security" color="#5eead4" bg="rgba(20,184,166,0.06)" border="rgba(20,184,166,0.15)">
          <ul className="space-y-2.5">
            <Li>Data is stored in an encrypted, access-controlled database and is only reachable through authenticated application requests.</Li>
            <Li>Passwords are hashed before storage; they are never visible to admins or stored as plain text.</Li>
            <Li>One-time passwords (OTPs) sent for login or password reset expire automatically after a short window (10 minutes) and cannot be reused.</Li>
            <Li>Access to member data is restricted by role — regular members can only see their own account details plus group-wide financial summaries that are shared with all members for transparency.</Li>
          </ul>
        </Section>

        <Section number="5" title="Sharing of Information" color="#f9a8d4" bg="rgba(236,72,153,0.06)" border="rgba(236,72,153,0.15)">
          <ul className="space-y-2.5">
            <Li>We do <strong className="text-white/80">not</strong> sell, rent, or share your personal information with third parties for marketing purposes.</Li>
            <Li>Your name, contribution history, and loan status are visible to group Admins for the purpose of running the group, and certain summarized figures (e.g. total collections, fund balance) are visible to all members for transparency.</Li>
            <Li>Emails (such as payment receipts and OTPs) are sent via a standard email delivery service solely to reach your registered address.</Li>
          </ul>
        </Section>

        <Section number="6" title="Your Rights" color="#c4b5fd" bg="rgba(139,92,246,0.06)" border="rgba(139,92,246,0.15)">
          <ul className="space-y-2.5">
            <Li>You may request a copy of the personal information we hold about you by contacting an Admin.</Li>
            <Li>You may request correction of inaccurate personal details (e.g. phone number, email, address).</Li>
            <Li>If you leave the group, your historical financial records are retained for accounting and audit purposes, but your login access is deactivated.</Li>
          </ul>
        </Section>

        <Section number="7" title="Cookies & Sessions" color="#6ee7b7" bg="rgba(16,185,129,0.06)" border="rgba(16,185,129,0.15)">
          <p className="text-sm text-white/55 leading-relaxed">
            This application uses a secure, essential session cookie to keep you signed in. It does not use
            third-party tracking or advertising cookies.
          </p>
        </Section>

        <Section number="8" title="Changes to This Policy" color="#fcd34d" bg="rgba(245,158,11,0.06)" border="rgba(245,158,11,0.15)">
          <p className="text-sm text-white/55 leading-relaxed">
            This Privacy Policy may be updated from time to time to reflect changes in how the application
            handles data. Members will be informed of significant changes.
          </p>
        </Section>

        <Section number="9" title="Contact Us" color="#818cf8" bg="rgba(99,102,241,0.06)" border="rgba(99,102,241,0.15)">
          <p className="text-sm text-white/55 leading-relaxed">
            If you have questions about this Privacy Policy or how your information is handled, please
            reach out to a group Admin, or contact: <strong className="text-white/80">People&apos;s Youth Association</strong> — M.Raviteja.
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
