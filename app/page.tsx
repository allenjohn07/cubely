import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";
import { FeaturesGrid } from "@/components/features-grid";
import { SocialCompete } from "@/components/social-compete";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <main>
        <Hero />
        <TrustedBy />
        <FeaturesGrid />
        <SocialCompete />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
