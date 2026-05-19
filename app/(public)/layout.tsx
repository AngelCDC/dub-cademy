import { ReactNode } from "react";
import { Navbar } from "./_components/Navbar";
import Footer from "./_components/footer";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
