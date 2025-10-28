import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import {
  addListItem,
  saveComponentDraft,
  selectEditListItem,
  updateListContent,
} from "@/store/slices/builderSlice";
import { isListDraft } from "@/helpers/type-helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

export default function ListDraft() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const draft = ui.draft;

  if (!draft) return;

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
        {items.map((item, index) => {
          if (index === props.editItem) {
            return <EditItemInput key={index} listId={draft.id} />;
          }

          return (
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
          );
        })}
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

function EditItemInput({ listId }: { listId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);
  const { draft } = ui;

  const wrapRef = useRef<HTMLDivElement>(null);

  if (!isListDraft(draft)) return;

  if (draft.props.editItem === null) return;

  const listItemText = draft.props.items[draft.props.editItem];

  const save = () => {
    if (draft.props.editItem !== null) {
      dispatch(
        saveComponentDraft({
          id: listId,
          kind: "list",
          parentId: draft.targetParentId || "",
          styles: draft.styles,
          props: draft.props,
        })
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    }
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        save();
      }
    };

    document.addEventListener("mousedown", handleMouseDown, true);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown, true);
    };
  }, [listId, draft.targetParentId, draft.styles, draft.props, dispatch]);

  return (
    <div ref={wrapRef}>
      <input
        autoFocus
        onChange={(e) => dispatch(updateListContent({ value: e.target.value }))}
        value={listItemText}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
