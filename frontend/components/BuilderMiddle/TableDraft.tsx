import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import {
  addColTable,
  addRowTable,
  selectEditCell,
  updateCellDraftContent,
  saveComponentDraft,
} from "@/store/slices/builderSlice";
import { isTableDraft } from "@/helpers/type-helpers";

export default function TableDraft() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const { draft } = ui;

  if (!isTableDraft(draft)) return null;

  if (!draft) return;

  const { headers, data } = draft?.props;

  const handleAddCol = () => {
    dispatch(addColTable());
  };

  const handleAddRow = () => {
    dispatch(addRowTable());
  };

  const editLocation = draft.props.editCell?.split(" ");

  return (
    <>
      <div className="flex items-start">
        <div></div>
        <table className="w-[60%] text-center">
          <thead>
            {/* Row 1 — column delete buttons */}
            <tr>
              {headers.map((_, i) => (
                <th key={`trash-${i}`} className="px-2 py-1">
                  <button
                    // onClick={() => handleDeleteColumn(i)}
                    className="bg-red-500 text-white font-semibold rounded-md px-2 py-1 hover:bg-red-600"
                  >
                    Trash
                  </button>
                </th>
              ))}
              {/* Empty header to align the right-side action column */}
              <th className="w-[80px]"></th>
            </tr>

            {/* Row 2 — header labels / edit inputs */}
            <tr>
              {headers.map((h, i) => {
                const isEditing =
                  editLocation &&
                  editLocation[0] === "h" &&
                  Number(editLocation[1]) === i;

                return (
                  <th
                    key={`h-${i}`}
                    onClick={() =>
                      dispatch(selectEditCell({ cellId: `h ${i}` }))
                    }
                    className="px-2 py-1 font-medium cursor-pointer"
                  >
                    {isEditing ? <EditCellInput tableId={draft.id} /> : h}
                  </th>
                );
              })}
              {/* Empty header to align the right-side action column */}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {/* Existing cells */}
                {row.map((cell, c) => {
                  const isEditing =
                    editLocation &&
                    Number(editLocation[0]) === r &&
                    Number(editLocation[1]) === c;

                  return (
                    <td
                      key={`${r}-${c}`}
                      onClick={() =>
                        dispatch(selectEditCell({ cellId: `${r} ${c}` }))
                      }
                      className="px-2 py-1 align-middle cursor-pointer"
                    >
                      {isEditing ? <EditCellInput tableId={draft.id} /> : cell}
                    </td>
                  );
                })}

                {/* Right-side row delete button */}
                <td className="px-2 py-1 text-right">
                  <button
                    // onClick={() => handleDeleteRow(r)}
                    className="bg-red-500 text-white font-semibold rounded-md px-2 py-1 hover:bg-red-600"
                    aria-label={`Delete row ${r + 1}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleAddCol}
          className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
        >
          Add Column
        </button>
      </div>
      <button
        onClick={handleAddRow}
        className="mt-4 bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
      >
        Add row
      </button>
    </>
  );
}

function EditCellInput({ tableId }: { tableId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { ui } = useSelector((state: RootState) => state.builderSlice);
  const { draft } = ui;
  if (!isTableDraft(draft)) return null;

  const cellLocation = draft?.props.editCell?.split(" ");

  const cellValue = cellLocation
    ? cellLocation[0] === "h"
      ? draft.props.headers[Number(cellLocation[1])]
      : draft.props.data[Number(cellLocation[0])][Number(cellLocation[1])]
    : "";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // commit the edit or exit edit mode
      dispatch(
        saveComponentDraft({
          id: tableId,
          kind: "table",
          parentId: draft.targetParentId || "",
          styles: draft.styles,
          props: draft.props,
        })
      );

      // optionally clear edit mode so it switches back to text view
    }
  };

  return (
    <input
      autoFocus
      onChange={(e) =>
        dispatch(updateCellDraftContent({ value: e.target.value }))
      }
      value={cellValue}
      onKeyDown={handleKeyDown}
      className="text-center"
    />
  );
}
