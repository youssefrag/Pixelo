import { isChartDraft } from "@/helpers/type-helpers";
import { RootState } from "@/store";
import { useCallback, useDebugValue, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ChartDraft() {
  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const dispatch = useDispatch();

  const { draft } = ui;

  if (!draft) return null;

  if (!isChartDraft(draft)) return null;

  // const data = draft.props.data as Array<Record<string, any>>;

  const { styles } = draft;

  // Form State

  const [data, setData] = useState<{ name: string; value: number }[]>([
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 990 },
    { name: "Apr", value: 200 },
  ]);

  const [idx, setIdx] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [value, setValue] = useState<number | "">("");

  const reset = () => {
    setIdx(null);
    setName("");
    setValue("");
  };

  const startEdit = (i: number) => {
    setIdx(i);
    setName(data[i].name);
    setValue(data[i].value);
  };

  const addOrSave = () => {
    if (name.trim() === "" || value === "") return;

    const row = { name, value: Number(value) };

    setData((d) => {
      if (idx === null) return [...d, row];

      const copy = d.slice();

      copy[idx] = row;

      return copy;
    });
  };

  const remove = (i: number) => {
    setData((d) => d.filter((_, k) => k !== i));

    if (idx === i) reset();
  };

  return (
    <>
      <LineChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#000"
          name="Unique Visitors"
        />
      </LineChart>

      <div className="flex gap-2 items-end flex-wrap">
        <div>
          <label className="block text-sm">Label</label>
          <input
            className="border px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">value</label>
          <input
            className="border px-2 py-1"
            value={value}
            onChange={(e) =>
              setValue(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <button className="border px-3 py-1" onClick={addOrSave}>
          {idx === null ? "Add point" : "Save changes"}
        </button>
        {idx !== null && (
          <button className="border px-3 py-1" onClick={reset}>
            Cancel
          </button>
        )}
        <div className="border">
          {data.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-2 py-1 border-t"
            >
              <span className="text-sm">
                {row.name} — value:{row.value}
              </span>

              <div className="flex gap-2">
                <button className="text-blue-600" onClick={() => startEdit(i)}>
                  Edit
                </button>
                <button className="text-red-600" onClick={() => remove(i)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
