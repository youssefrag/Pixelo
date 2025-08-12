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

  const reverseParentIndex = useMemo(() => {
    const map = new Map<string, string>();
    for (const n of Object.values(nodes)) {
      if (!n) continue;
      for (const c of n.children) map.set(c, n.id);
    }

    return map;
  }, [nodes]);

  const getParentOf = useCallback(
    (id: string | null): string | null => {
      if (!id) return null;
      return nodes[id]?.parentId ?? reverseParentIndex.get(id) ?? null;
    },
    [nodes, reverseParentIndex]
  );

  const autoOpenAncestors = useMemo(() => {
    const set = new Set<string>();
    if (!selectedId) return set;

    let cur = getParentOf(selectedId);

    while (cur) {
      set.add(cur);
      cur = getParentOf(cur);
    }
    return set;
  }, [nodes, selectedId, reverseParentIndex]);

  const isOpen = useCallback<(id: string) => boolean>(
    (id) => id === selectedId || !!expanded?.[id] || autoOpenAncestors.has(id),
    [selectedId, expanded, autoOpenAncestors]
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
