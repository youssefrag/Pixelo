import { memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";
import {
  addSection,
  select,
  openComponentPicker,
  editComponent,
} from "@/store/slices/builderSlice";

type SectionNodeProps = {
  id: string;
};

export const SectionNode = memo(function SectionNode({ id }: SectionNodeProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { rootOrder, nodes, selectedId, expanded } = useSelector(
    (state: RootState) => state.builderSlice
  );

  const node = nodes[id];

  const handeAddNestedSection = () => {
    const siblingsCount = node.children?.length;
    const sectionName = `${node.name} - ${siblingsCount || 0 + 1}`;

    const action = dispatch(
      addSection({ name: sectionName, parentId: node.id })
    );

    dispatch(select(action.payload.id));
  };

  const handleAddComponent = () => {
    dispatch(openComponentPicker({ parentId: id }));
  };

  const isSectionSelected = node.id === selectedId;

  if (node.type === "section") {
    return (
      <>
        <div
          onClick={() => dispatch(select(id))}
          // className="cursor-pointer flex items-center gap-4 bg-[#FFEFE0]"
          className={`cursor-pointer flex items-center gap-4 ${
            isSectionSelected
              ? "bg-[#FF7A00] text-white font-bold"
              : "bg-[#FFEFE0]"
          }`}
        >
          <FontAwesomeIcon icon={faChevronDown} />
          <div>{node.name}</div>
        </div>

        <div className="flex flex-col gap-4 ml-6 my-3">
          {nodes[id].depth <= 2 && (
            <button
              onClick={handeAddNestedSection}
              className="bg-[#ffa24d] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
            >
              Add Section
            </button>
          )}
          <button
            onClick={handleAddComponent}
            className="bg-[#ffa24d] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
          >
            Add Component
          </button>
        </div>
        {node.children.map((childId) => {
          const isChildSelected = selectedId === childId;

          return expanded.includes(childId) ? (
            <div key={childId} className="ml-6">
              <SectionNode id={childId} />
            </div>
          ) : nodes[childId].type === "section" ? (
            <div
              key={childId}
              onClick={() => dispatch(select(childId))}
              className="flex items-center gap-4 cursor-pointer ml-6"
            >
              <FontAwesomeIcon icon={faChevronRight} />
              <div>{nodes[childId].name}</div>
            </div>
          ) : (
            <div
              key={childId}
              onClick={() => dispatch(editComponent({ id: childId }))}
              className={`flex items-center gap-4 cursor-pointer ml-6 mb-2 pl-2                   ${
                isChildSelected
                  ? "bg-[#FF7A00] text-white font-bold"
                  : "bg-[#FFEFE0]"
              }`}
            >
              <div
                className={`font-bold cursor-pointer flex items-center gap-4`}
              >
                Component - {nodes[childId].name}
              </div>
            </div>
          );
        })}
      </>
    );
  }
});
