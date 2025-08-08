import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeHeaderShell from "@/components/HomeHeader/HomeHeaderShell";
import HeroSection from "@/components/HeroSection/HeroSection";
import SitesSection from "@/components/SitesSection/SitesSection";
import HowItWorks from "@/components/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <>
      <HomeHeaderShell>
        <HomeHeader />
      </HomeHeaderShell>
      <HeroSection />
      <SitesSection />
      <HowItWorks />
    </>
  );
}
