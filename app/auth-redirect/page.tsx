import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Intermediate landing page hit right after any login flow.
 * Reads the session role and bounces the user to the correct dashboard.
 * No UI is rendered — this is a pure server-side redirect.
 */
export default async function AuthRedirectPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
}
