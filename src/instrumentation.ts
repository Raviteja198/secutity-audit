export async function register() {
  // Only meaningful on the Node.js runtime — the in-process cron scheduler needs
  // real timers/globals that don't exist on the Edge runtime.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startReminderCronIfNeeded } = await import("@/lib/cronScheduler");
    startReminderCronIfNeeded();
  }
}
