import { isChartDraft } from "@/helpers/type-helpers";
import { RootState } from "@/store";
import {
  addToChartData,
  selectEditChartItem,
  editChartData,
  removeChartData,
} from "@/store/slices/builderSlice";
import { useCallback, useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

export default function ChartDraft() {
  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const dispatch = useDispatch();

  const { draft } = ui;

  if (!draft) return null;

  if (!isChartDraft(draft)) return null;

  const data = draft.props.data as Array<Record<string, any>>;

  console.log(data);

  const { editIdx } = draft.props;

  const { styles } = draft;

  // Form State

  const [name, setName] = useState("");
  const [value, setValue] = useState<number | "">("");

  // on onMount i want to reset

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const reset = () => {
    dispatch(selectEditChartItem({ idx: null }));
    setName("");
    setValue("");
  };

  const startEdit = (i: number) => {
    dispatch(selectEditChartItem({ idx: i }));
    setName(data[i].name);
    setValue(data[i].value);
  };

  const addOrSave = () => {
    if (name.trim() === "" || value === "") return;

    const row = { name, value: Number(value) };

    if (editIdx === null) {
      dispatch(addToChartData({ newData: row }));
      reset();
    } else {
      dispatch(editChartData({ newData: row, idx: editIdx }));
      reset();
    }
  };

  const remove = (i: number) => {
    dispatch(removeChartData({ idx: i }));
  };

  const { lineType, lineColour, strokeWidth, axisColour, textColour } =
    draft.styles;

  const rawWidth = Number(styles?.widthPct);
  const safeWidth = Number.isFinite(rawWidth) ? rawWidth : 80;

  return (
    <>
      <div
        className="relative aspect-[2/1] rounded-xl bg-white/5"
        style={{ width: `${safeWidth}%` }}
      >
        <ResponsiveContainer key={safeWidth} width="100%" height="100%">
          <LineChart width={400} height={300} data={data}>
            <XAxis
              dataKey="name"
              tick={{ fill: textColour, fontSize: 15, fontWeight: 700 }}
              axisLine={{ stroke: axisColour, strokeWidth: 4 }}
              tickLine={{ stroke: axisColour, strokeWidth: 4 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              tick={{ fill: textColour, fontSize: 15, fontWeight: 700 }}
              axisLine={{ stroke: axisColour, strokeWidth: 4 }}
              tickLine={{ stroke: axisColour, strokeWidth: 4 }}
              padding={{ top: 20, bottom: 20 }}
            />
            <Line
              type={lineType as CurveType}
              dataKey="value"
              stroke={lineColour}
              strokeWidth={Number(strokeWidth)}
              name="Values"
              isAnimationActive={false}
              dot={(dotProps) => {
                const { key, ...rest } = dotProps;
                return (
                  <CustomDot
                    key={key ?? rest.index}
                    {...rest}
                    editIdx={editIdx}
                    startEdit={startEdit}
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
            type="number"
            className="border px-2 py-1"
            value={value}
            onChange={(e) =>
              setValue(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <button className="border px-3 py-1" onClick={addOrSave}>
          {editIdx === null ? "Add point" : "Save changes"}
        </button>
        {editIdx !== null && (
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

type CustomDotProps = {
  cx: number;
  cy: number;
  index: number;
  editIdx: number | null;
  startEdit: (i: number) => void;
};

function CustomDot({ cx, cy, index, editIdx, startEdit }: CustomDotProps) {
  const isActive = editIdx === index;

  return (
    <g
      transform={`translate(${cx}, ${cy})`}
      style={{ pointerEvents: "all", cursor: "pointer" }}
      onClick={(e) => {
        e.stopPropagation();
        startEdit(index);
      }}
    >
      <circle cy={-6} r={20} fill="transparent" />

      <circle
        r={isActive ? 6 : 3}
        fill={isActive ? "#FF7A00" : "#000"}
        stroke="#fff"
        strokeWidth={isActive ? 2 : 1}
      />
    </g>
  );
}
