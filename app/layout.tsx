import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velocityacademy.com"),
  title: {
    template: "%s | VELOCITY Academy",
    default: "VELOCITY Academy — Transforma tu carrera tech",
  },
  description:
    "Academia online de alto impacto. Programas de desarrollo web, data science, diseño UX/UI y marketing digital con mentoría personalizada y comunidad activa.",
  keywords: [
    "academia online",
    "programación",
    "desarrollo web",
    "data science",
    "diseño UX UI",
    "marketing digital",
    "cursos online",
    "mentoría",
    "bootcamp",
    "LATAM",
    "España",
  ],
  authors: [{ name: "VELOCITY Academy" }],
  creator: "VELOCITY Academy",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "VELOCITY Academy",
    title: "VELOCITY Academy — Transforma tu carrera tech",
    description:
      "Academia online de alto impacto. Aprende con proyectos reales, mentoría personalizada y comunidad activa.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "VELOCITY Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VELOCITY Academy — Transforma tu carrera tech",
    description:
      "Academia online de alto impacto. Aprende con proyectos reales, mentoría personalizada y comunidad activa.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster closeButton position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
