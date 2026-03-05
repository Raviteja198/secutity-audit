import { redirect } from "next/navigation";
import { getSession } from "@/lib/server-auth";

export default async function Home() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");
  redirect("/user");
}
