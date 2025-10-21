import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import { addColTable, addRowTable } from "@/store/slices/builderSlice";
import { isTableDraft } from "@/helpers/type-helpers";

export default function TableDraft() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const { draft } = ui;

  if (!isTableDraft(draft)) return null;

  if (!draft) return;

  const { headers, data } = draft?.props;

  console.log({ headers, data });

  const handleAddCol = () => {
    dispatch(addColTable());
  };

  const handleAddRow = () => {
    dispatch(addRowTable());
  };

  return (
    <>
      <div className="flex items-start">
        <table className="w-[60%] text-center">
          <thead>
            <tr>
              {headers.map((h, i) => {
                return (
                  <th key={i} className="px-2 py-1 font-medium">
                    {h}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="px-2 py-1 align-middle">
                    {cell}
                  </td>
                ))}
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
