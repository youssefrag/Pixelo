import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";
import { addSection, select } from "@/store/slices/builderSlice";
import { SectionNode } from "./SectionNode";

export default function SectionTree() {
  const dispatch = useDispatch<AppDispatch>();
  const { rootOrder, nodes, selectedId, expanded } = useSelector(
    (state: RootState) => state.builderSlice
  );

  return (
    <div>
      {rootOrder.map((id) => {
        // return expanded.includes(id) ? (
        return id === selectedId ? (
          <SectionNode key={id} id={id} />
        ) : (
          <div
            onClick={() => dispatch(select(id))}
            key={id}
            className="flex items-center gap-4 cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} />
            <div>{nodes[id].name}</div>
          </div>
        );
      })}
    </div>
  );
}
