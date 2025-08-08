import Image from "next/image";

export default function HowItWorks() {
  return (
    <section>
      <div className="px-[60px] pb-[60px] mb-[30px]">
        <div className="flex justify-between items-center mb-[60px]">
          <div>
            <div className="text-[#FF7A00] font-[600]">HOW IT WORKS</div>
            <div className="text-[44px] font-[500]">How Pixelo Works</div>
          </div>
          <button className="relative z-10 bg-[#FF7A00] px-[16px] py-[12px] rounded-full text-white font-[600] text-lg">
            Start Building
          </button>
        </div>
        <div className="h-[300px] border border-[#E9EAEB] rounded-[20px] flex justify-between items-center px-[40px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] bg-white">
          <div className="flex flex-col">
            <div className="text-[80px] font-[600] text-[#F3F3F3] mb-[-60px]">
              01
            </div>
            <Image
              src="/assets/skew.svg"
              alt="skew"
              width={48}
              height={48}
              className="ml-[10px] mb-[40px]"
            />
            <div className="font-[600] text-[20px] mb-[20px]">
              Pick Components
            </div>
            <div className="font-[400] text-[16px] text-[#535862]">
              Choose from lists, images, tables, and more
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[80px] font-[600] text-[#F3F3F3] mb-[-60px]">
              02
            </div>
            <Image
              src="/assets/cursor-box.svg"
              alt="skew"
              width={48}
              height={48}
              className="ml-[10px] mb-[40px]"
            />
            <div className="font-[600] text-[20px] mb-[20px]">Drag & Drop</div>
            <div className="font-[400] text-[16px] text-[#535862]">
              Arrange your page visually with instant preview
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[80px] font-[600] text-[#F3F3F3] mb-[-60px]">
              03
            </div>
            <Image
              src="/assets/layout-alt.svg"
              alt="skew"
              width={48}
              height={48}
              className="ml-[10px] mb-[40px]"
            />
            <div className="font-[600] text-[20px] mb-[20px]">Go Live</div>
            <div className="font-[400] text-[16px] text-[#535862]">
              Hit publish and share your site with one click
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-[60px] mb-[80px">
        <div className="text-[#FF7A00] text-[16px] font-[600] mb-[10px]">
          WHY US?
        </div>
        <div className="text-[44px] font-[500] mb-[10px]">
          Why Choose Pixelo
        </div>
        <div className="text-[18px] font-[400] mb-[30px]">
          Everything you need to launch faster
        </div>
        <div className="flex gap-[30px]">
          <div className="flex flex-col border border-[#E9EAEB] p-[15px] rounded-[20px] w-[289px] shadow-lg bg-white">
            <div className="h-[48px] w-[48px] flex justify-center items-center bg-[#FEEDDE] rounded-[12px] mb-[15px]">
              <Image src="/assets/el.png" alt="hiw1" width={20} height={18} />
            </div>
            <div className="text-[20px] font-[600] mb-[10px]">
              No Code Needed
            </div>
            <div className="text-[16px] text-[#535862] font-[400] mb-[10px]">
              Design without touching a single line of code
            </div>
          </div>
          <div className="flex flex-col border border-[#E9EAEB] p-[15px] rounded-[20px] w-[289px] shadow-lg bg-white">
            <div className="h-[48px] w-[48px] flex justify-center items-center bg-[#FEEDDE] rounded-[12px] mb-[15px]">
              <Image
                src="/assets/zap-fast.svg"
                alt="hiw1"
                width={20}
                height={18}
              />
            </div>
            <div className="text-[20px] font-[600] mb-[10px]">
              Lightning Fast
            </div>
            <div className="text-[16px]  text-[#535862] font-[400] mb-[10px]">
              Instant updates and live responsive previews
            </div>
          </div>
          <div className="flex flex-col border border-[#E9EAEB] p-[15px] rounded-[20px] w-[289px] shadow-lg bg-white">
            <div className="h-[48px] w-[48px] flex justify-center items-center bg-[#FEEDDE] rounded-[12px] mb-[15px]">
              <Image
                src="/assets/message-dots-circle.svg"
                alt="hiw1"
                width={20}
                height={18}
              />
            </div>
            <div className="text-[20px] font-[600] mb-[10px]">
              Built-in Chatbox
            </div>
            <div className="text-[16px]  text-[#535862] font-[400] mb-[10px]">
              Connect with visitors directly and instantly
            </div>
          </div>
          <div className="flex flex-col border border-[#E9EAEB] p-[15px] rounded-[20px] w-[289px] shadow-lg bg-white">
            <div className="h-[48px] w-[48px] flex justify-center items-center bg-[#FEEDDE] rounded-[12px] mb-[15px]">
              <Image src="/assets/pen.svg" alt="hiw1" width={20} height={18} />
            </div>
            <div className="text-[20px] font-[600] mb-[10px]">
              Fully Customizable
            </div>
            <div className="text-[16px]  text-[#535862] font-[400] mb-[10px]">
              Control every detail, from layout to theme
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-[50px]">
        <div className="w-[1000px] h-[260px] bg-[#FF7A00] bg-[url('/assets/cta-bg.png')] bg-no-repeat bg-center bg-[length:100%_auto] rounded-[24px] flex flex-col items-center shadow-2xl">
          <div className="text-white font-[500] text-[44px] mt-[40px] mb-[20px]">
            Ready to build your first site?
          </div>
          <div className="text-white font-[400] text-[18px] mb-[20px]">
            It takes just minutes to go live
          </div>
          <button className="bg-white px-[25px] py-[12px] rounded-full font-[500] text-[16px]">
            Start Building
          </button>
        </div>
      </div>
    </section>
  );
}
