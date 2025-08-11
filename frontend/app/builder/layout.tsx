import BuilderHeader from "@/components/BuilderHeader/BuilderHeader";
import LeftBar from "@/components/BuilderSideBars/LeftBar";
import RightBar from "@/components/BuilderSideBars/RightBar";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <BuilderHeader />
      <div className="flex flex-1">
        <LeftBar />
        <main className="flex-1 overflow-auto">{children}</main>
        <RightBar />
      </div>
    </div>
  );
}
