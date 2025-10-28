import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import {
  addListItem,
  saveComponentDraft,
  selectEditListItem,
} from "@/store/slices/builderSlice";
import { isListDraft } from "@/helpers/type-helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ListDraft() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  if (!isListDraft(ui.draft)) return;

  const { props, styles } = ui.draft;

  const { items } = props;

  const isOrdered = styles.listType === "ordered";
  const ListTag = isOrdered ? "ol" : "ul";

  return (
    <>
      <ListTag
        style={{
          listStyleType: isOrdered ? "decimal" : "disc",
          paddingLeft: "2rem",
          lineHeight: "1.6",
        }}
      >
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center gap-2">
              <span>{item}</span>
              <div className="ml-2 flex gap-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() =>
                    dispatch(selectEditListItem({ itemIdx: index }))
                  }
                  className="cursor-pointer"
                />
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </li>
        ))}
      </ListTag>
      <button
        onClick={() => dispatch(addListItem())}
        className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
      >
        + Add List Item
      </button>
    </>
  );
}
