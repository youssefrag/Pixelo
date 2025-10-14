"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

import { updateSelectedStyle } from "@/store/slices/builderSlice";
import SectionEditor from "./SectionEditor";
import ComponentEditor from "./ComponentEditor";

export default function RightBar() {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedId, nodes, ui } = useSelector(
    (state: RootState) => state.builderSlice
  );

  const target =
    ui.draft && ui.draft.id === selectedId ? ui.draft : nodes[selectedId ?? ""];

  const setStyle = (key: string, value: string) => {
    dispatch(updateSelectedStyle({ key, value }));
  };

  return (
    <div className="w-[260px] border-l border-[#E9EAEB] p-4">
      <div className="text-[#6D6D6D] font-[600] mb-[15px]">Styles Panel</div>
      {!target ? (
        <SectionEditor />
      ) : target.type === "component" ? (
        <ComponentEditor />
      ) : (
        <SectionEditor />
      )}
    </div>
  );
}
