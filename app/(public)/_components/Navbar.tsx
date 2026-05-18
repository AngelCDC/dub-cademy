"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { useSignOut } from "@/hooks/use-singout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";

const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Cursos", href: "/courses" },
  { name: "Rutas", href: "/rutas" },
  { name: "Metodología", href: "/metodologia" },
  { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleSignOut = useSignOut();

  return (
    <>
      <nav className="fixed top-0 w-full z-[1000] bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 lg:px-16 xl:px-20 h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-semibold text-xl tracking-widest uppercase text-foreground hover:text-primary transition-colors"
          >
            VELOCITY
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10 list-none">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wider transition-colors relative",
                    "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                    pathname === item.href
                      ? "text-primary after:w-full"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={session?.user.image ?? `https://avatar.vercel.sh/${session?.user.email}`}
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <Button asChild size="sm">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 lg:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 bg-card border-l border-border shadow-2xl z-[1001] transition-transform duration-300 lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-16 md:h-20 border-b border-border">
          <span className="font-semibold text-lg tracking-widest uppercase">VELOCITY</span>
          <button
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md text-sm font-medium uppercase tracking-wider transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          {isPending ? null : session ? (
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                Iniciar Sesión
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
