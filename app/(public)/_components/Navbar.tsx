"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";

const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Cursos", href: "/courses" },
  { name: "Metodología", href: "/metodologia" },
  { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full px-16 max-xl:px-12 max-lg:px-8 py-6 max-xl:py-5 flex justify-between items-center z-[1000] bg-white/98 backdrop-blur-[20px] border-b border-black/5 animate-slide-down">
        <Link 
          href="/" 
          className="font-antonio text-[2rem] max-xl:text-[1.7rem] font-bold tracking-[0.15em] text-primary-black relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-[30%] after:h-[3px] after:bg-accent-red"
        >
          VELOCITY
        </Link>
        
        {/* Desktop navigation */}
        <ul className="hidden lg:flex gap-12 max-xl:gap-8 list-none items-center">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`nav-link max-xl:text-[0.85rem] ${pathname === item.href ? 'nav-link-active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          
          {/* Theme Toggle 
          <li>
            <ThemeToggle />
          </li>*/}

          <li>
            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className='login-button cta-primary'>
                  Login
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden w-10 h-10 border-2 border-primary-black rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:bg-primary-black hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[1001] transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8">
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>

          {/* Logo */}
          <div className="font-antonio text-2xl font-bold tracking-[0.15em] text-primary-black mb-12 mt-4">
            VELOCITY
          </div>

          {/* Navigation Links */}
          <ul className="space-y-6">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`block text-lg font-medium tracking-wider uppercase transition-colors ${
                    pathname === item.href 
                      ? 'text-accent-red' 
                      : 'text-primary-black hover:text-accent-red'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle 
          <div className="mt-8 pt-8 border-t border-mid-gray">
            <ThemeToggle />
          </div>*/}

          {/* Auth Section */}
          <div className="mt-8 pt-8 border-t border-mid-gray">
            {isPending ? (
              <div className="text-center text-text-gray">Cargando...</div>
            ) : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <Link 
                href="/login" 
                className="block w-full py-3 px-6 bg-accent-red text-white text-center font-bold tracking-wider uppercase rounded-lg hover:bg-accent-orange transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}