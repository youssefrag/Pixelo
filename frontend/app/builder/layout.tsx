import BuilderHeader from "@/components/BuilderHeader/BuilderHeader";
import LeftBar from "@/components/BuilderSideBars/LeftBar";
import RightBar from "@/components/BuilderSideBars/RightBar";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <header className="sticky top-0 z-30 bg-white border-b border-[#E9EAEB]">
        <BuilderHeader />
      </header>

      <div className="absolute inset-0 flex">
        <LeftBar />

        <main className="flex-1 overflow-y-auto pt-[66px]">{children}</main>

        <RightBar />
      </div>
    </div>
  );
}
