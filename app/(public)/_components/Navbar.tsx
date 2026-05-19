"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { useSignOut } from "@/hooks/use-singout";
import { cn } from "@/lib/utils";
import { Search, X, Menu, GraduationCap } from "lucide-react";

const navItems = [
  { name: "Cursos", href: "/courses" },
  { name: "Rutas", href: "/rutas" },
  { name: "Metodología", href: "/metodologia" },
  { name: "Contacto", href: "/contacto" },
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
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <GraduationCap className="size-4 text-white" />
            </div>
            <span className="font-bold text-white text-[17px] tracking-tight hidden sm:block">
              Velocity
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="flex items-center gap-2 w-full bg-white/6 border border-white/10 rounded-full px-4 py-2 focus-within:border-white/25 transition-colors">
              <Search className="size-3.5 text-white/40 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué quieres aprender?"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
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
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "text-white font-medium"
                      : "text-white/50 hover:text-white"
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
                  <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5">
                    Ingresar
                  </Link>
                  <Link
                    href="/login"
                    className="text-sm font-semibold bg-primary hover:bg-primary/85 text-white px-5 py-2 rounded-full transition-colors"
                  >
                    Empezar gratis
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden ml-auto p-1.5 text-white/50 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-72 bg-[#141414] border-l border-white/8 z-50 flex flex-col transition-transform duration-300 lg:hidden",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="size-3.5 text-white" />
            </div>
            <span className="font-bold text-white">Velocity</span>
          </div>
          <button className="p-1 text-white/40 hover:text-white" onClick={() => setOpen(false)}>
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
                "flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-white/8 space-y-2">
          {!isPending && (
            session ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">Dashboard</Link>
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="flex items-center justify-center w-full py-2.5 rounded-lg text-sm text-white/70 bg-white/5 hover:bg-white/10 transition-colors">Ingresar</Link>
                <Link href="/login" onClick={() => setOpen(false)} className="flex items-center justify-center w-full py-2.5 rounded-lg text-sm font-semibold bg-primary hover:bg-primary/85 text-white transition-colors">Empezar gratis</Link>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
