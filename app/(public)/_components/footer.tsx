import React from "react";
import Link from "next/link";

interface FooterLink { label: string; href: string }
interface FooterColumn { title: string; links: FooterLink[] }
interface SocialLink { label: string; href: string }
interface FooterProps {
  brand?: { name: string; description: string };
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
}

const defaultBrand = {
  name: "VELOCITY",
  description:
    "Academia online de alto impacto. Transformamos talento en profesionales de élite a través de educación práctica, mentoría personalizada y conexión directa con la industria.",
};

const defaultColumns: FooterColumn[] = [
  {
    title: "Programas",
    links: [
      { label: "Desarrollo Web", href: "/courses" },
      { label: "Data Science", href: "/courses" },
      { label: "Diseño UX/UI", href: "/courses" },
      { label: "Marketing Digital", href: "/courses" },
    ],
  },
  {
    title: "Academia",
    links: [
      { label: "Sobre Nosotros", href: "#" },
      { label: "Metodología", href: "/metodologia" },
      { label: "Rutas de Aprendizaje", href: "/rutas" },
      { label: "Trabaja con Nosotros", href: "#" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Contacto", href: "/contacto" },
      { label: "Preguntas Frecuentes", href: "/contacto" },
      { label: "Becas", href: "#" },
      { label: "Empresas", href: "#" },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Discord", href: "#" },
];

const Footer: React.FC<FooterProps> = ({
  brand = defaultBrand,
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} VELOCITY ACADEMY. Todos los derechos reservados.`,
}) => {
  return (
    <footer className="border-t bg-muted/30 px-6 lg:px-16 xl:px-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-semibold text-xl tracking-widest uppercase text-foreground">
              {brand.name}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {brand.description}
            </p>
          </div>

          {/* Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{copyright}</p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
