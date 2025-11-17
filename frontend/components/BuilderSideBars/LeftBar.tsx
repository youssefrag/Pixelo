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
import SectionTree from "./SectionTree";
import {
  addSection,
  select,
  clearDraft,
  openComponentPicker,
} from "@/store/slices/builderSlice";
import ComponentPicker from "./ComponentPicker";

export default function LeftBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { rootOrder, nodes, selectedId, ui } = useSelector(
    (state: RootState) => state.builderSlice
  );

  const addTopLevel = () => {
    const index = rootOrder.length + 1;
    dispatch(addSection({ name: `Section ${index}`, parentId: null }));
    dispatch(select(selectedId));
  };

  if (ui.leftBar.tab === "layout") {
    return (
      // <aside className="w-[260px] border-r border-[#E9EAEB] p-4">
      <aside
        className="
        w-[260px]
        border-r border-[#E9EAEB]
        sticky
        top-[66px]
        h-[calc(100vh-66px)]
        overflow-y-auto
        p-4
      "
      >
        {!rootOrder.length ? (
          <div className="text-[#6D6D6D] font-[600] mb-[15px]">
            No sections added yet!
          </div>
        ) : (
          <SectionTree />
        )}
        <div className="border-t pt-[10px]">
          <button
            onClick={addTopLevel}
            className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
          >
            + Add Section
          </button>
        </div>
      </aside>
    );
  } else {
    return <ComponentPicker />;
  }
}
