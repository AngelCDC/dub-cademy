"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/public/LogoDubois.svg";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
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

  return (
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
              <Link
                href="/login"
                className='login-button cta-primary'
              >
                Login
              </Link>
              
            </div>
          )}
        </li>
      </ul>

      {/* Mobile menu button */}
      <button className="md:hidden w-10 h-10 border-2 border-primary-black rounded-full flex items-center justify-center text-lg">
        ☰
      </button>
    </nav>
  );
}
