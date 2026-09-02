import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireUser = cache(async (redirectTo?: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    if (redirectTo) {
      return redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    }
    return redirect("/login");
  }

  return session.user;
});
