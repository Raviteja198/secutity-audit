"use client";

import { useState } from "react";

type FormState = {
  groupName: string;
  contactName: string;
  email: string;
  phone: string;
  memberCount: string;
  city: string;
  currentProcess: string;
  notes: string;
  website: string; // honeypot
};

const initialState: FormState = {
  groupName: "",
  contactName: "",
  email: "",
  phone: "",
  memberCount: "",
  city: "",
  currentProcess: "",
  notes: "",
  website: "",
};

export function TenantOnboardingForm({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    if (form.website) {
      // honeypot tripped — pretend success, don't submit
      setStatus("success");
      setForm(initialState);
      return;
    }

    try {
      const res = await fetch("https://formspree.io/f/xlgqlgow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          groupName: form.groupName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
          memberCount: form.memberCount,
          city: form.city,
          currentProcess: form.currentProcess,
          notes: form.notes,
          _subject: `New group onboarding request: ${form.groupName}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const close = () => {
    setOpen(false);
    setStatus("idle");
    setError(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "btn-ghost text-sm px-6 py-3 w-full sm:w-auto text-center"}
      >
        Onboard Your Group
      </button>

      {open && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal-box max-w-lg p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-1.5">Request received</h3>
                <p className="text-white/50 text-sm mb-6">
                  Thanks — we&apos;ll reach out shortly to get your group set up.
                </p>
                <button type="button" onClick={close} className="btn-ghost text-sm px-5 py-2.5">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white/90 mb-1">Onboard your group</h3>
                  <p className="text-white/50 text-sm">
                    Tell us about your association and we&apos;ll set up your workspace.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* honeypot — hidden from real users, bots tend to fill every field */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="groupName" className="block text-xs font-medium text-white/60 mb-1.5">
                        Group / Association name *
                      </label>
                      <input
                        id="groupName"
                        name="groupName"
                        required
                        value={form.groupName}
                        onChange={handleChange}
                        className="glass-input"
                        placeholder="Sunrise Youth Association"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="block text-xs font-medium text-white/60 mb-1.5">
                        Your name *
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        required
                        value={form.contactName}
                        onChange={handleChange}
                        className="glass-input"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="glass-input"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-white/60 mb-1.5">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="glass-input"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="memberCount" className="block text-xs font-medium text-white/60 mb-1.5">
                        Approx. number of members
                      </label>
                      <input
                        id="memberCount"
                        name="memberCount"
                        value={form.memberCount}
                        onChange={handleChange}
                        className="glass-input"
                        placeholder="e.g. 40"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-xs font-medium text-white/60 mb-1.5">
                        City / Location
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="glass-input"
                        placeholder="Hyderabad, India"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="currentProcess" className="block text-xs font-medium text-white/60 mb-1.5">
                      How do you track this today?
                    </label>
                    <input
                      id="currentProcess"
                      name="currentProcess"
                      value={form.currentProcess}
                      onChange={handleChange}
                      className="glass-input"
                      placeholder="Spreadsheets, notebooks, another app..."
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-xs font-medium text-white/60 mb-1.5">
                      Anything else we should know?
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={handleChange}
                      className="glass-input resize-none"
                      placeholder="Optional"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <div className="flex items-center justify-end gap-3 mt-2">
                    <button type="button" onClick={close} className="btn-ghost text-sm px-5 py-2.5">
                      Cancel
                    </button>
                    <button type="submit" disabled={status === "submitting"} className="btn-gradient text-sm px-6 py-2.5">
                      {status === "submitting" ? "Sending..." : "Request Access"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
