"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { useSignOut } from "@/hooks/use-singout";
import { cn } from "@/lib/utils";
import { Search, X, Menu, Zap } from "lucide-react";

const navItems = [
  { name: "Cursos", href: "/courses" },
  { name: "Rutas", href: "/rutas" },
  { name: "Empresas", href: "/empresas" },
  { name: "Blog", href: "/blog" },
  { name: "Precios", href: "/precios" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleSignOut = useSignOut();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/courses?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
            <div className="size-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Zap className="size-4 text-white fill-white" />
            </div>
            <span className="font-bold text-[#1a1535] text-[17px] tracking-tight hidden sm:block">
              Flow State
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="flex items-center gap-2 w-full bg-violet-50 border border-violet-100 rounded-full px-4 py-2 focus-within:border-violet-300 focus-within:bg-white transition-colors">
              <Search className="size-3.5 text-violet-400 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué quieres aprender hoy?"
                className="flex-1 bg-transparent text-sm text-[#1a1535] placeholder:text-violet-300 outline-none"
              />
            </div>
          </form>

          {/* Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-colors",
                    pathname === item.href
                      ? "text-primary font-semibold bg-violet-50"
                      : "text-slate-500 hover:text-[#1a1535] hover:bg-violet-50/60"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            {!isPending && (
              session ? (
                <UserDropdown
                  email={session.user.email}
                  image={session.user.image ?? `https://avatar.vercel.sh/${session.user.email}`}
                  name={session.user.name?.length > 0 ? session.user.name : session.user.email.split("@")[0]}
                />
              ) : (
                <>
                  <Link href="/login" className="text-sm text-slate-500 hover:text-[#1a1535] transition-colors px-3 py-1.5">
                    Ingresar
                  </Link>
                  <Link
                    href="/login"
                    className="text-sm font-semibold bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full transition-all hover:-translate-y-0.5"
                  >
                    Entrar en la zona →
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden ml-auto p-1.5 text-slate-500 hover:text-[#1a1535] transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-72 bg-white border-l border-violet-100 z-50 flex flex-col transition-transform duration-300 lg:hidden",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-violet-100">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="size-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-[#1a1535]">Flow State</span>
          </div>
          <button className="p-1 text-slate-400 hover:text-[#1a1535]" onClick={() => setOpen(false)}>
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center px-4 py-2.5 rounded-xl text-sm transition-colors",
                pathname === item.href
                  ? "bg-violet-50 text-primary font-semibold"
                  : "text-slate-500 hover:text-[#1a1535] hover:bg-violet-50/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-violet-100 space-y-2">
          {!isPending && (
            session ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-[#1a1535] hover:bg-violet-50 transition-colors">Dashboard</Link>
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-[#1a1535] hover:bg-violet-50 transition-colors">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm text-slate-600 bg-violet-50 hover:bg-violet-100 transition-colors">Ingresar</Link>
                <Link href="/login" onClick={() => setOpen(false)} className="flex items-center justify-center w-full py-2.5 rounded-full text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors">Entrar en la zona →</Link>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
