import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import {
  addColTable,
  addRowTable,
  selectEditCell,
  updateCellDraftContent,
  saveComponentDraft,
  deleteTableCol,
  deleteTableRow,
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

  const handleDeleteRow = (row: number) => {
    dispatch(deleteTableRow({ row }));
  };

  const handleDeleteCol = (col: number) => {
    dispatch(deleteTableCol({ col }));
  };

  const editLocation = draft.props.editCell?.split(" ");

  return (
    <>
      <div className="flex items-start">
        <div></div>
        <table className="w-[60%] text-center table-fixed">
          <thead>
            <tr>
              {headers.map((_, i) => (
                <th key={`trash-${i}`} className="px-2 py-1">
                  <button
                    onClick={() => handleDeleteCol(i)}
                    className="bg-red-500 text-white font-semibold rounded-md px-2 py-1 hover:bg-red-600"
                  >
                    Trash
                  </button>
                </th>
              ))}
              <th className="w-[80px]"></th>
            </tr>

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
                    className="
              px-2 py-2 font-semibold cursor-pointer align-middle
              whitespace-normal break-words
            "
                  >
                    {isEditing ? <EditCellInput tableId={draft.id} /> : h}
                  </th>
                );
              })}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
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
                      className="
                px-2 py-2 align-middle cursor-pointer
                whitespace-normal break-words
              "
                    >
                      {isEditing ? <EditCellInput tableId={draft.id} /> : cell}
                    </td>
                  );
                })}

                <td className="px-2 py-2 text-right">
                  <button
                    onClick={() => handleDeleteRow(r)}
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

        {draft.props.headers.length < 10 && (
          <button
            onClick={handleAddCol}
            className="bg-[#FF7A00] px-[10px] p-[6px] text-white font-[700] rounded-[8px] cursor-pointer"
          >
            Add Column
          </button>
        )}
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
      className="
    w-full min-w-0 h-8 px-2 box-border text-center
    [font:inherit] [line-height:inherit]
    bg-transparent outline-none border border-transparent
    focus:border-transparent focus:ring-0
  "
    />
  );
}
