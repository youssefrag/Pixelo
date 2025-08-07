import Image from "next/image";

import HowItWorksImg from "@/public/assets/how-it-works.png";

export default function HowItWorks() {
  return (
    <div className="px-[60px] pb-[60px]">
      <div className="flex justify-between items-center mb-[60px]">
        <div>
          <div className="text-[#FF7A00] font-[600]">HOW IT WORKS</div>
          <div className="text-[44px] font-[500]">How Pixelo Works</div>
        </div>
        <button className="relative z-10 bg-[#FF7A00] px-[16px] py-[12px] rounded-full text-white font-[600] text-lg">
          Start Building
        </button>
      </div>
      <div className="flex justify-center">
        <Image src={HowItWorksImg} alt="instructions" />
      </div>
    </div>
  );
}
