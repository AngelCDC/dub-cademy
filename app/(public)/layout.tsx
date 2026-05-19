import { ReactNode } from "react";
import { Navbar } from "./_components/Navbar";
import Footer from "./_components/footer";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#F8F6FF] min-h-screen text-[#1a1535]">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
