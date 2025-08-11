import Link from "next/link";
import Image from "next/image";

import HeroImage from "@/public/assets/hero.png";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-[180px] bg-transparent flex flex-col items-center gap-5">
      <div
        className="absolute inset-0 bg-[#FF7A00]/15 mask mask-[url('/assets/Blocks.svg')] mask-repeat"
        style={{ WebkitMaskRepeat: "repeat" }}
      />
      <div className="relative z-10 w-[805px] text-center text-[56px] text-[#181D27] font-[500]">
        Build Your Site Without Writing a Single Line of Code
      </div>
      <div className="relative z-10 w-[625px] text-center text-[18px] text-[#414651] font-[700]">
        Pixelo lets you drag, drop, and launch professional websites in minutes.
        No coding, just creativity
      </div>
      <Link
        href="/builder"
        className="relative z-10 bg-[#FF7A00] px-[16px] py-[12px] rounded-full text-white font-[600] text-lg cursor-pointer"
      >
        Start Building
      </Link>
      <Image className="relative z-10" src={HeroImage} alt="hero" />
    </section>
  );
}
