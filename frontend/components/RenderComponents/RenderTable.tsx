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
    <div>
      <table
        onClick={() => dispatch(editComponent({ id: table.id }))}
        className={`w-[60%] text-center table-fixed ${tableVariantStyles}`}
      >
        <colgroup>
          {headers.map((_, i) => (
            <col key={i} />
          ))}
          <col style={{ width: 80 }} />
        </colgroup>

        <thead>
          <tr>
            {headers.map((_, i) => (
              <th key={`spacer-${i}`} className="px-2 py-1" />
            ))}
            <th className="w-[80px]" />
          </tr>

          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-2 py-2 cursor-pointer align-middle whitespace-normal break-words"
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

            <th className="px-2 py-2 w-[80px]" />
          </tr>
        </thead>

        <tbody>
          {data.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td
                  key={`${r}-${c}`}
                  className="px-2 py-2 align-middle cursor-pointer whitespace-normal break-words"
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

              <td className="px-2 py-2 w-[80px]" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
