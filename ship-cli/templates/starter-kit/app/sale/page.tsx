import { CtaFooter } from "./_components/cta-footer";
import { Faq } from "./_components/faq";
import { Features } from "./_components/features";
import { Hero } from "./_components/hero";
import { Pricing } from "./_components/pricing";
import { Problem } from "./_components/problem";
import { Testimonials } from "./_components/testimonials";

export default function SalePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Problem />
      <Features />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaFooter />
    </main>
  );
}
