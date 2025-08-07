import Image from "next/image";

import HeroImage from "@/public/assets/hero.png";

export default function HeroSection() {
  return (
    <section className="w-full py-[96px] bg-[#FF7A00]/3 bg-[url('/assets/Blocks.svg')] bg-auto bg-repeat bg-blend-multiply flex flex-col items-center gap-5">
      <div className="w-[805px] text-center text-[56px] text-[#181D27] font-[500]">
        Build Your Site Without Writing a Single Line of Code
      </div>
      <div className="w-[625px] text-center text-[18px] text-[#414651] font-[700]">
        Pixelo lets you drag, drop, and launch professional websites in minutes.
        No coding, just creativity
      </div>
      <button className="bg-[#FF7A00] px-[16px] py-[12px] rounded-full text-white font-[600] text-lg">
        Start Building
      </button>
      <Image src={HeroImage} alt="hero" />
    </section>
  );
}
