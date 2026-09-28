import { NextResponse } from "next/server";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { status: 200, ...init });
}

export function jsonCreated<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function jsonError(err: unknown) {
  const requestedStatus =
    typeof err === "object" &&
    err &&
    "status" in err &&
    typeof (err as { status?: unknown }).status === "number"
      ? (err as { status: number }).status
      : 500;
  const status = requestedStatus >= 400 && requestedStatus <= 599 ? requestedStatus : 500;
  const message =
    typeof err === "object" && err && "message" in err
      ? String((err as { message?: unknown }).message)
      : "Error";

  // Expected 4xx validation/authentication messages remain useful to the UI.
  // Never expose exception details for server faults in production.
  const safeMessage = status >= 500 && process.env.NODE_ENV === "production"
    ? "Something went wrong. Please try again."
    : message;

  return NextResponse.json({ error: safeMessage }, { status });
}
