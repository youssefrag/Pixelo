import Image from "next/image";

import Eclipse from "@/public/assets/eclipse.svg";
import BackgroundPattern from "@/public/assets/Blocks.svg";

import HeroSection from "@/components/HeroSection/HeroSection";

import HomeHeader from "@/components/HomeHeader/HomeHeader";
export default function Home() {
  return (
    <>
      <HomeHeader />
      <HeroSection />
    </>
  );
}
