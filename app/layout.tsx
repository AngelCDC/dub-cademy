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
  metadataBase: new URL("https://flowstate.academy"),
  title: {
    template: "%s | Flow State",
    default: "Flow State — Aprende en tu zona",
  },
  description:
    "La academia que te lleva al estado de flow. Aprendizaje personalizado, proyectos reales y mentoría 1-a-1 para que entres en la zona y no salgas.",
  keywords: [
    "flow state",
    "academia online",
    "aprendizaje personalizado",
    "programación",
    "desarrollo web",
    "data science",
    "diseño UX UI",
    "cursos online",
    "mentoría",
    "LATAM",
    "España",
  ],
  authors: [{ name: "Flow State" }],
  creator: "Flow State",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Flow State",
    title: "Flow State — Aprende en tu zona",
    description:
      "La academia que te lleva al estado de flow. Aprendizaje personalizado y proyectos reales para acelerar tu carrera tech.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Flow State Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flow State — Aprende en tu zona",
    description:
      "La academia que te lleva al estado de flow. Aprendizaje personalizado y proyectos reales.",
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
