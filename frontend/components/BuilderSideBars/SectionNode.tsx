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
    console.log(node);
    const siblingsCount = node.children.length;
    const sectionName = `${node.name} - ${siblingsCount + 1}`;

    const action = dispatch(
      addSection({ name: sectionName, parentId: node.id })
    );

    dispatch(select(action.payload.id));
  };

  const handleAddComponent = () => {
    dispatch(openComponentPicker({ parentId: id }));
  };

  const isSelected = node.id === selectedId;

  if (node.type === "section") {
    return (
      <>
        <div
          onClick={() => dispatch(select(id))}
          // className="cursor-pointer flex items-center gap-4 bg-[#FFEFE0]"
          className={`cursor-pointer flex items-center gap-4 ${
            isSelected ? "bg-[#FF7A00] text-white font-bold" : "bg-[#FFEFE0]"
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
        {node.children.map((childId) =>
          expanded.includes(childId) ? (
            <div key={childId} className="ml-6">
              <SectionNode id={childId} />
            </div>
          ) : (
            <div
              key={childId}
              onClick={() => dispatch(select(childId))}
              className="flex items-center gap-4 cursor-pointer ml-6"
            >
              <FontAwesomeIcon icon={faChevronRight} />
              <div>{nodes[childId].name}</div>
            </div>
          )
        )}
      </>
    );
  }
});
