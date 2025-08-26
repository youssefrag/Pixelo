"use client";

import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCaretRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";
import { addSection, select, toggleExpand } from "@/store/slices/builderSlice";

export default function LeftBar() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rootOrder,
    nodes,
    selectedId,
    expanded = {},
  } = useSelector((state: RootState) => state.builderSlice);

  console.log(rootOrder);

  return (
    <div className="w-[260px] border-r border-[#E9EAEB] p-4">
      {!rootOrder.length && (
        <div className="text-[#6D6D6D] font-[600] mb-[15px]">
          No sections added yet!
        </div>
      )}
      <div className="border-t pt-[10px]">
        <button
          // onClick={addTopLevel}
          className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
        >
          + Add section
        </button>
      </div>
    </div>
  );
}
