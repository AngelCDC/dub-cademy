import { ReactNode } from "react";
import { Navbar } from "./_components/Navbar";
import Footer from "./_components/footer";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
