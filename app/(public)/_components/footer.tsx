import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
}

interface FooterProps {
  brand?: {
    name: string;
    description: string;
  };
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
      { label: "Desarrollo Web", href: "#" },
      { label: "Data Science", href: "#" },
      { label: "Diseño UX/UI", href: "#" },
      { label: "Marketing Digital", href: "#" },
    ],
  },
  {
    title: "Academia",
    links: [
      { label: "Sobre Nosotros", href: "#" },
      { label: "Metodología", href: "#" },
      { label: "Instructores", href: "#" },
      { label: "Trabaja con Nosotros", href: "#" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Contacto", href: "#" },
      { label: "Preguntas Frecuentes", href: "#" },
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
  copyright = "© 2024 VELOCITY ACADEMY. Todos los derechos reservados.",
}) => {
  return (
    <footer className="bg-primary-black text-white py-24 px-16 pb-12 max-md:px-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16 max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Brand Section */}
        <div>
          <div className="font-antonio text-[2.5rem] font-bold tracking-[0.15em] mb-6">
            {brand.name}
          </div>
          <p className="opacity-60 leading-[1.6]">{brand.description}</p>
        </div>

        {/* Footer Columns */}
        {columns.map((column, index) => (
          <div key={index}>
            <h4 className="font-antonio text-base tracking-[0.2em] uppercase mb-6">
              {column.title}
            </h4>
            <ul className="list-none space-y-3">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.href}
                    className="text-white no-underline opacity-60 transition-all duration-300 hover:opacity-100 hover:pl-[5px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 pt-8 flex justify-between items-center opacity-60 text-[0.85rem] max-w-[1600px] mx-auto max-md:flex-col max-md:gap-4 max-md:text-center">
        <div>{copyright}</div>

        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="text-white no-underline transition-colors duration-300 hover:text-accent-red"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
