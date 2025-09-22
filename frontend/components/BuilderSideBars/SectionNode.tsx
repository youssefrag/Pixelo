import { memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";
import { addSection } from "@/store/slices/builderSlice";

type SectionNodeProps = {
  id: string;
};

export const SectionNode = memo(function SectionNode({ id }: SectionNodeProps) {
  const dispatch = useDispatch<AppDispatch>();

  const node = useSelector((s: RootState) => s.builderSlice.nodes[id]);

  const handeAddNestedSection = () => {
    console.log(node);
    const siblingsCount = node.children.length;
    const sectionName = `${node.name} - ${siblingsCount + 1}`;

    console.log(sectionName);
    dispatch(addSection({ name: sectionName, parentId: node.id }));
  };

  if (node.type === "section") {
    return (
      <>
        <div className="flex items-center gap-4 bg-[#FFEFE0]">
          <FontAwesomeIcon icon={faChevronDown} />
          <div className="bg-[#FFEFE0]">{node.name}</div>
        </div>
        <div className="flex flex-col gap-4 ml-6 my-3">
          <button
            onClick={handeAddNestedSection}
            className="bg-[#ffa24d] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
          >
            Add Section
          </button>
          <button className="bg-[#ffa24d] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer">
            Add Component
          </button>
        </div>
      </>
    );
  }
});
