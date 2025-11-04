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

  const { data } = draft.props;

  const { styles } = draft;

  console.log(styles);

  const chartData = data as Array<Record<string, any>>;

  console.log(chartData);

  return (
    <>
      <LineChart width={400} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#000"
          name="Unique Visitors"
        />
        <Line type="monotone" dataKey="pv" stroke="#000" name="Page Views" />
      </LineChart>
    </>
  );
}
