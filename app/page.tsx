import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Fleet } from "@/components/sections/Fleet";
import { Terms } from "@/components/sections/Terms";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { Contacts, Footer } from "@/components/sections/Contacts";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

/**
 * Порядок секций — это порядок сомнений арендатора, он зафиксирован в
 * PRODUCT.md и не меняется:
 * серьёзная ли контора → по карману ли → какие подводные → долго ли →
 * ещё сомневаюсь → как связаться.
 */
export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="flex-1">
        <Hero />
        <Fleet />
        <Terms />
        <HowItWorks />
        <Trust />
        <Contacts />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
