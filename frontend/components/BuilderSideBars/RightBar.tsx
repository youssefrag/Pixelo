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

  const target = ui.draft ?? (selectedId ? nodes[selectedId] : undefined);

  return (
    <aside
      className="
        w-[260px]
        border-l border-[#E9EAEB]
        sticky
        top-[66px]
        h-[calc(100vh-66px)]
        overflow-y-auto
      "
    >
      <div className="p-4">
        <div className="text-[#6D6D6D] font-[600] mb-[15px]">Styles Panel</div>
        {!target ? (
          <SectionEditor />
        ) : target.type === "component" ? (
          <ComponentEditor key={ui.draft?.id ?? selectedId ?? "none"} />
        ) : (
          <SectionEditor />
        )}
      </div>
    </aside>
  );
}
