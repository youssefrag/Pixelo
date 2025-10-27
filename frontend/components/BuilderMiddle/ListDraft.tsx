import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import { addListItem, saveComponentDraft } from "@/store/slices/builderSlice";
import { isListDraft } from "@/helpers/type-helpers";

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
          paddingLeft: "1.5rem",
          lineHeight: "1.6",
        }}
      >
        {items.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ListTag>
      <button
        onClick={() => dispatch(addListItem())}
        className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
      >
        + Add Section
      </button>
    </>
  );
}
