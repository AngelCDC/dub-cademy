import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Precios",
  description: "Planes para estudiantes y equipos. Empieza gratis y escala cuando quieras.",
  openGraph: { title: "Precios | Flow State", url: "/precios" },
};

export default function PreciosLayout({ children }: { children: ReactNode }) {
  return children;
}
