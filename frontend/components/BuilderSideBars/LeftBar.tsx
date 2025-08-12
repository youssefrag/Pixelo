"use client";

import { useState } from "react";
import { UseDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";
import { addSection, select } from "@/store/slices/builderSlice";

export default function LeftBar() {
  const [mode, setMode] = useState<"sections" | "components">("sections");

  const dispatch = useDispatch<AppDispatch>();
  const { rootOrder, nodes, selectedId } = useSelector(
    (state: RootState) => state.builderSlice
  );

  const handleAdd = () => {
    const newIndex = rootOrder.length + 1;
    dispatch(addSection({ name: `Section ${newIndex}` }));
  };

  const renderSections = rootOrder.map((sectionId) => {
    return <h1 key={sectionId}>{nodes[sectionId].name}</h1>;
  });

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
        <div className="border-b border-[#E9EAEB] w-[95%]"></div>
      </div>
      <div className="px-[30px]">
        {rootOrder.length === 0 ? (
          <div className="text-[#6D6D6D] font-[600] mb-[15px]">
            No sections added yet
          </div>
        ) : (
          renderSections
        )}
        <button
          onClick={handleAdd}
          className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} size="1x" /> Add section
        </button>
      </div>
    </div>
  );
}
