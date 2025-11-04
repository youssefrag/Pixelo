import { isChartDraft } from "@/helpers/type-helpers";
import { RootState } from "@/store";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

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

  const { draft } = ui;

  if (!draft) return null;

  if (!isChartDraft(draft)) return null;

  const { data } = draft.props;

  const chartData = data as Array<Record<string, any>>;

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [labelDraft, setLabelDraft] = useState<string>("");

  const startEdit = useCallback((index: number, current: string) => {
    setEditingIndex(index);
    setLabelDraft(current);
  }, []);

  const commit = useCallback(() => {
    if (editingIndex === null) return;
    // setData((prev) =>
    //   prev.map((d, i) => (i === editingIndex ? { ...d, name: draft } : d))
    // );
    setEditingIndex(null);
  }, [draft, editingIndex]);

  return (
    <div style={{ width: "100%", height: 340 }}>
      ChartDraft
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            tick={(props) => (
              <EditableTick
                {...props}
                editingIndex={editingIndex}
                draft={labelDraft}
                setDraft={setLabelDraft}
                startEdit={startEdit}
                commit={commit}
              />
            )}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" dot />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type TickProps = {
  x?: number;
  y?: number;
  payload?: { value: string; index: number };
};

function EditableTick({
  x = 0,
  y = 0,
  payload,
  editingIndex,
  draft,
  setDraft,
  startEdit,
  commit,
}: TickProps & {
  editingIndex: number | null;
  draft: string;
  setDraft: (v: string) => void;
  startEdit: (index: number, current: string) => void;
  commit: () => void;
}) {
  if (!payload) return null;

  const { value, index } = payload;
  const isEditing = editingIndex === index;

  return (
    <g transform={`translate(${x},${y})`} style={{ cursor: "pointer" }}>
      {isEditing ? (
        <foreignObject x={-40} y={-24} width={80} height={28}>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape")
                (e.currentTarget as HTMLInputElement).blur();
            }}
            style={{
              width: "78px",
              height: "22px",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "center",
            }}
          />
        </foreignObject>
      ) : (
        <text
          dy={16}
          textAnchor="middle"
          fill="#666"
          onClick={() => startEdit(index, value)}
        >
          {value}
        </text>
      )}
    </g>
  );
}
