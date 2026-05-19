import Link from "next/link";
import { Zap, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react";

const cols = [
  { heading: "Aprender", items: [{ l: "Todos los cursos", h: "/courses" }, { l: "Rutas de aprendizaje", h: "/rutas" }, { l: "Metodología", h: "/metodologia" }] },
  { heading: "Categorías", items: [{ l: "Desarrollo Web", h: "/courses" }, { l: "Data Science & IA", h: "/courses" }, { l: "Diseño UX/UI", h: "/courses" }, { l: "Marketing Digital", h: "/courses" }] },
  { heading: "Compañía", items: [{ l: "Sobre nosotros", h: "#" }, { l: "Trabaja con nosotros", h: "#" }, { l: "Contacto", h: "/contacto" }, { l: "Becas", h: "#" }] },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-violet-100 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="size-4 text-white fill-white" />
              </div>
              <span className="font-bold text-[#1a1535] text-lg">Flow State</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              La academia que te lleva al estado de flow. Aprendizaje personalizado,
              proyectos reales y comunidad activa.
            </p>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="size-8 rounded-lg bg-violet-50 hover:bg-violet-100 border border-violet-100 flex items-center justify-center text-violet-400 hover:text-primary transition-all">
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1a1535] mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.l}>
                    <Link href={item.h} className="text-sm hover:text-primary transition-colors">{item.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} Flow State. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-xs hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
