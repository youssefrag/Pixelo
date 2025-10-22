import { TableComponentNode } from "@/app/types";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

import { editComponent } from "@/store/slices/builderSlice";

export default function RenderTable({ table }: { table: TableComponentNode }) {
  const dispatch = useDispatch<AppDispatch>();

  const { props } = table;

  const { headers, data } = props as { headers: string[]; data: string[][] };

  return (
    <div className="overflow-x-auto">
      <table
        onClick={() => dispatch(editComponent({ id: table.id }))}
        className="table-auto max-w-full text-center cursor-pointer"
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-2 py-1 font-medium">
                {h}
              </th>
            ))}
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
    </div>
  );
}
