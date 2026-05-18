import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "¿Tienes dudas sobre nuestros programas? Nuestro equipo de asesores académicos está listo para ayudarte a elegir el camino correcto para tu carrera.",
  openGraph: {
    title: "Contacto | VELOCITY Academy",
    description:
      "Habla con nuestro equipo y descubre el programa ideal para transformar tu carrera tech.",
    url: "/contacto",
  },
};

export default function ContactoLayout({ children }: { children: ReactNode }) {
  return children;
}
