import Image from "next/image";
import Site1 from "@/public/assets/site1.png";
import Site2 from "@/public/assets/site2.png";
import Site3 from "@/public/assets/site3.png";
import Site4 from "@/public/assets/site4.png";
import Site5 from "@/public/assets/site5.png";

export default function SitesSection() {
  return (
    <section className="w-full py-[96px] flex flex-col items-center gap-5">
      <div className="text-[#FF7A00] font-[600] text-lg">PIXELO SITES</div>
      <div className="font-[500] text-[44px]">Explore What You Can Build</div>
      <div className="text-[#414651] font-[400] text-[18px]">
        Sites made in minutes using Pixelo
      </div>
      <div className="flex gap-10">
        <div className="w-[300px] h-[240px] relative">
          <Image
            src={Site1}
            alt="site1"
            fill
            className="object-contain rounded-[24px]"
          />
        </div>
        <div className="w-[300px] h-[240px] relative">
          <Image
            src={Site2}
            alt="site2"
            fill
            className="object-contain rounded-[24px]"
          />
        </div>
        <div className="w-[300px] h-[240px] relative">
          <Image
            src={Site3}
            alt="site3"
            fill
            className="object-contain rounded-[24px]"
          />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-[300px] h-[240px] relative">
          <Image
            src={Site4}
            alt="site4"
            fill
            className="object-contain rounded-[24px]"
          />
        </div>
        <div className="w-[300px] h-[240px] relative">
          <Image
            src={Site5}
            alt="site5"
            fill
            className="object-contain rounded-[24px]"
          />
        </div>
      </div>
    </section>
  );
}
