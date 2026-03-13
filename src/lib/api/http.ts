import { NextResponse } from "next/server";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { status: 200, ...init });
}

export function jsonCreated<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function jsonError(err: unknown) {
  const status =
    typeof err === "object" &&
    err &&
    "status" in err &&
    typeof (err as { status?: unknown }).status === "number"
      ? (err as { status: number }).status
      : 500;
  const message =
    typeof err === "object" && err && "message" in err
      ? String((err as { message?: unknown }).message)
      : "Error";
  return NextResponse.json({ error: message }, { status });
}

