import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Metodología",
  description:
    "Conoce nuestra metodología de aprendizaje basada en proyectos reales, mentoría personalizada y comunidad activa. Aprende diferente y transforma tu carrera.",
  openGraph: {
    title: "Metodología | VELOCITY Academy",
    description:
      "Aprende diferente: proyectos reales, mentoría 1-a-1 y comunidad activa. Descubre cómo funciona VELOCITY Academy.",
    url: "/metodologia",
  },
};

export default function MetodologiaLayout({ children }: { children: ReactNode }) {
  return children;
}
