"use client";

import { useState } from "react";

export default function LeftBar() {
  const [mode, setMode] = useState<"sections" | "components">("sections");

  return (
    <div className="w-[260px] border-r border-[#E9EAEB]">
      <div className="flex px-[25px] py-[10px] ]">
        {mode === "sections" ? (
          <div className="basis-1/2 flex justify-center items-center h-[50px] bg-[#FF7A00] rounded-lg text-md font-[600] text-white">
            Sections
          </div>
        ) : (
          <div
            onClick={() => setMode("sections")}
            className="basis-1/2 flex justify-center items-center text-[#6D6D6D] cursor-pointer"
          >
            Sections
          </div>
        )}
        {mode === "components" ? (
          <div className="basis-1/2 flex justify-center items-center h-[50px] bg-[#FF7A00] rounded-lg text-md font-[600] text-white">
            Components
          </div>
        ) : (
          <div
            onClick={() => setMode("components")}
            className="basis-1/2 flex justify-center items-center text-[#6D6D6D] cursor-pointer"
          >
            Components
          </div>
        )}
      </div>
      <div className="flex px-[25px] py-[10px] justify-center">
        <div className="border-b border-[#E9EAEB] w-[80%]"></div>
      </div>
    </div>
  );
}
