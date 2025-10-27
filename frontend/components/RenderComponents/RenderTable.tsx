import { TableComponentNode } from "@/app/types";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

import { editComponent } from "@/store/slices/builderSlice";
import { getVariableStylesTable } from "@/helpers/styling-helpers";
import { weightMap } from "@/helpers/constants";

export default function RenderTable({ table }: { table: TableComponentNode }) {
  const dispatch = useDispatch<AppDispatch>();

  const { props, styles } = table;

  const { headers, data } = props as { headers: string[]; data: string[][] };

  const { tableVariantStyles } = getVariableStylesTable(styles);

  console.log(styles);

  return (
    <div className="not-prose overflow-x-auto">
      <table
        onClick={() => dispatch(editComponent({ id: table.id }))}
        className={`table-auto max-w-full text-center cursor-pointer ${tableVariantStyles}`}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-2 py-1`}
                style={{
                  fontSize: `${styles.headerFontSize}px`,
                  fontWeight:
                    weightMap[
                      styles.headingFontWeight as keyof typeof weightMap
                    ] ?? 400,
                  backgroundColor: styles.headingBGColour,
                  color: styles.headingTextColour,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className="px-2 py-1 align-middle"
                  style={{
                    fontSize: `${styles.dataFontSize}px`,
                    fontWeight:
                      weightMap[
                        styles.dataFontWeight as keyof typeof weightMap
                      ] ?? 400,
                    backgroundColor: styles.dataBGColour,
                    color: styles.dataTextColour,
                  }}
                >
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
