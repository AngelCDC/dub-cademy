import { auth } from "@/lib/auth";
import { LoginForm } from "./_components/LoginForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const { redirect: redirectTo } = await searchParams;
    const valid = redirectTo && redirectTo.length < 200 && /^\/[^/\\]/.test(redirectTo);
    return redirect(valid ? redirectTo : "/");
  }
  return <LoginForm />;
}
