import { jsonError } from "@/lib/api/http";

/**
 * Loan deletion requires OTP: POST .../delete/request then POST .../delete/confirm
 */
export async function DELETE() {
  return jsonError(
    Object.assign(
      new Error("Use POST /delete/request to send OTP, then POST /delete/confirm with the code."),
      { status: 405 }
    )
  );
}
