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
import { SectionTree } from "./SectionTree";

export default function LeftBar() {
  const [mode, setMode] = useState<"sections" | "components">("sections");

  const dispatch = useDispatch<AppDispatch>();
  const {
    rootOrder,
    nodes,
    selectedId,
    expanded = {},
  } = useSelector((state: RootState) => state.builderSlice);

  // const handleAdd = (parentId: string | null = null) => {
  //   const index = parentId
  //     ? (nodes[parentId]?.children.length ?? 0) + 1
  //     : rootOrder.length + 1;

  //   dispatch(addSection({ name: `Section ${index}`, parentId }));
  // };

  const autoOpenAncestors = useMemo(() => {
    const set = new Set<string>();
    let cur = selectedId ? nodes[selectedId]?.parentId ?? null : null;
    while (cur) {
      set.add(cur);
      cur = nodes[cur]?.parentId ?? null;
    }
    return set;
  }, [nodes, selectedId]);

  // const renderSections = rootOrder.map((sectionId) => {
  //   if (selectedId !== sectionId) {
  //     return (
  //       <div
  //         onClick={() => dispatch(select(sectionId))}
  //         key={sectionId}
  //         className="flex items-center gap-3"
  //       >
  //         <FontAwesomeIcon icon={faCaretRight} size="2x" />
  //         {nodes[sectionId].name}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="flex-col" key={sectionId}>
  //         <div className="flex items-center gap-3">
  //           <FontAwesomeIcon icon={faCaretDown} size="2x" />
  //           {nodes[sectionId].name}
  //         </div>
  //         {nodes[sectionId].children.length === 0 && (
  //           <div>Section has no children</div>
  //         )}
  //         <button
  //           onClick={() => handleAdd(sectionId)}
  //           className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
  //         >
  //           <FontAwesomeIcon icon={faPlus} size="1x" /> Add inner section
  //         </button>
  //       </div>
  //     );
  //   }
  // });

  const isOpen = useCallback(
    (id: string) => !!expanded[id] || autoOpenAncestors.has(id),
    [expanded, autoOpenAncestors]
  );

  const onToggleExpand = useCallback(
    (id: string) => dispatch(toggleExpand(id)),
    [dispatch]
  );

  const onSelect = useCallback(
    (id: string) => dispatch(select(id)),
    [dispatch]
  );

  // Add top-level section
  const addTopLevel = useCallback(() => {
    const index = rootOrder.length + 1;
    dispatch(addSection({ name: `Section ${index}`, parentId: null }));
  }, [dispatch, rootOrder.length]);

  // Add child section to a given parent
  const onAddChild = useCallback(
    (parentId: string) => {
      const n = (nodes[parentId]?.children.length ?? 0) + 1;
      dispatch(addSection({ name: `Section ${n}`, parentId }));
    },
    [dispatch, nodes]
  );

  return (
    <div className="w-[260px] border-r border-[#E9EAEB]">
      {/* Tabs */}
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

      {/* Divider */}
      <div className="flex px-[25px] py-[10px] justify-center">
        <div className="border-b border-[#E9EAEB] w-[95%]"></div>
      </div>

      {/* Content */}
      <div className="px-[30px]">
        {mode === "sections" ? (
          <>
            {rootOrder.length === 0 ? (
              <div className="text-[#6D6D6D] font-[600] mb-[15px]">
                No sections added yet
              </div>
            ) : (
              <SectionTree
                ids={rootOrder}
                nodes={nodes}
                selectedId={selectedId}
                isOpen={isOpen}
                onToggleExpand={onToggleExpand}
                onSelect={onSelect}
                onAddChild={onAddChild}
              />
            )}

            <div className="border-t pt-[10px]">
              <button
                onClick={addTopLevel}
                className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
              >
                + Add section
              </button>
            </div>
          </>
        ) : (
          <div className="text-[#6D6D6D] font-[600] mb-[15px]">
            Components view (coming soon)
          </div>
        )}
      </div>
    </div>
  );
}
