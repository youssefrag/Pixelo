import Image from "next/image";
import Site1 from "@/public/assets/site1.png";
import Site2 from "@/public/assets/site2.png";
import Site3 from "@/public/assets/site3.png";
import Site4 from "@/public/assets/site4.png";
import Site5 from "@/public/assets/site5.png";

export default function SitesSection() {
  return (
    <section
      id="sites-section"
      className="w-full pb-[96px] pt-[140px] flex flex-col items-center gap-5"
    >
      <div className="text-[#FF7A00] font-[600] text-lg">PIXELO SITES</div>
      <div className="font-[500] text-[44px]">Explore What You Can Build</div>
      <div className="text-[#414651] font-[400] text-[18px]">
        Sites made in minutes using Pixelo
      </div>
      <div className="flex gap-10 mb-[50px]">
        {[Site1, Site2, Site3].map((src, i) => (
          <div
            key={i}
            className="w-[300px] h-[240px] relative shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-[16px] overflow-hidden"
          >
            <Image
              src={src}
              alt={`site${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-10">
        {[Site4, Site5].map((src, i) => (
          <div
            key={i}
            className="w-[300px] h-[240px] relative shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-[16px] overflow-hidden"
          >
            <Image
              src={src}
              alt={`site${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
