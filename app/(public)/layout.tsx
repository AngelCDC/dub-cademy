import { ReactNode } from "react";
import { Navbar } from "./_components/Navbar";
import Footer from "./_components/footer";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary-black">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
