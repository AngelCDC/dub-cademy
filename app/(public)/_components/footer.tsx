import Link from "next/link";
import { GraduationCap, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react";

const cols = [
  { heading: "Aprender", items: [{ l: "Todos los cursos", h: "/courses" }, { l: "Rutas de aprendizaje", h: "/rutas" }, { l: "Metodología", h: "/metodologia" }] },
  { heading: "Categorías", items: [{ l: "Desarrollo Web", h: "/courses" }, { l: "Data Science & IA", h: "/courses" }, { l: "Diseño UX/UI", h: "/courses" }, { l: "Marketing Digital", h: "/courses" }] },
  { heading: "Compañía", items: [{ l: "Sobre nosotros", h: "#" }, { l: "Trabaja con nosotros", h: "#" }, { l: "Contacto", h: "/contacto" }, { l: "Becas", h: "#" }] },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/6 text-white/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="size-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Velocity</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Academia tech de alto impacto. Proyectos reales, mentoría personalizada
              y comunidad activa.
            </p>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="size-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center hover:text-white transition-all">
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.l}>
                    <Link href={item.h} className="text-sm hover:text-white transition-colors">{item.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} Velocity Academy. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-xs hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
