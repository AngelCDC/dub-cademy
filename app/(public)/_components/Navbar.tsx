"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { useSignOut } from "@/hooks/use-singout";
import { cn } from "@/lib/utils";
import { X, Menu, GraduationCap } from "lucide-react";

const navItems = [
  { name: "Cursos", href: "/courses" },
  { name: "Rutas", href: "/rutas" },
  { name: "Metodología", href: "/metodologia" },
  { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const handleSignOut = useSignOut();

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="size-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              Velocity
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-white bg-white/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3">
            {!isPending && (
              session ? (
                <UserDropdown
                  email={session.user.email}
                  image={session.user.image ?? `https://avatar.vercel.sh/${session.user.email}`}
                  name={
                    session.user.name?.length > 0
                      ? session.user.name
                      : session.user.email.split("@")[0]
                  }
                />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-3 py-2"
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/login"
                    className="text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2 transition-colors"
                  >
                    Empezar gratis
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 bg-slate-950 border-l border-white/10 z-50 transition-transform duration-300 lg:hidden flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary flex items-center justify-center">
              <GraduationCap className="size-3.5 text-white" />
            </div>
            <span className="font-bold text-white">Velocity</span>
          </div>
          <button
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/20 text-primary"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          {!isPending && (
            session ? (
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => { handleSignOut(); setOpen(false); }}
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Ingresar
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Empezar gratis
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
