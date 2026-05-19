import Link from "next/link";
import { GraduationCap, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react";

const links = [
  {
    heading: "Aprender",
    items: [
      { label: "Todos los cursos", href: "/courses" },
      { label: "Rutas de aprendizaje", href: "/rutas" },
      { label: "Nuestra metodología", href: "/metodologia" },
    ],
  },
  {
    heading: "Categorías",
    items: [
      { label: "Desarrollo Web", href: "/courses" },
      { label: "Data Science & IA", href: "/courses" },
      { label: "Diseño UX/UI", href: "/courses" },
      { label: "Marketing Digital", href: "/courses" },
    ],
  },
  {
    heading: "Compañía",
    items: [
      { label: "Sobre nosotros", href: "#" },
      { label: "Trabaja con nosotros", href: "#" },
      { label: "Contacto", href: "/contacto" },
      { label: "Becas", href: "#" },
    ],
  },
];

const socials = [
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "Discord", href: "#", icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="size-5 text-white" />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">Velocity</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Academia tech de alto impacto. Aprende con proyectos reales,
              mentoría personalizada y una comunidad que te impulsa.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="size-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {links.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Velocity Academy. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {["Privacidad", "Términos", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-xs hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
