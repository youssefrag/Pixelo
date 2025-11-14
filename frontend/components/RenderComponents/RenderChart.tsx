import { ChartComponentNode, ChartDataPoint } from "@/app/types";
import { AppDispatch } from "@/store";
import { editComponent } from "@/store/slices/builderSlice";
import { useDispatch } from "react-redux";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

export default function RenderChart({ chart }: { chart: ChartComponentNode }) {
  if (!chart) return null;

  const dispatch = useDispatch<AppDispatch>();

  const data = chart.props.data as ChartDataPoint[];

  const {
    lineType,
    lineColour,
    strokeWidth,
    axisColour,
    textColour,
    widthPct,
  } = chart.styles;

  const rawWidth = Number(widthPct);
  const safeWidth = Number.isFinite(rawWidth) ? rawWidth : 80;

  return (
    <>
      <div
        className="relative aspect-[2/1] rounded-xl bg-white/5"
        style={{ width: `${widthPct}%` }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={400}
            height={300}
            data={data}
            onClick={() => {
              dispatch(editComponent({ id: chart.id }));
            }}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: textColour, fontSize: 15, fontWeight: 700 }}
              axisLine={{ stroke: axisColour, strokeWidth: 4 }}
              tickLine={{ stroke: axisColour, strokeWidth: 4 }}
              padding={{ right: 20 }}
            />
            <YAxis
              tick={{ fill: textColour, fontSize: 15, fontWeight: 700 }}
              axisLine={{ stroke: axisColour, strokeWidth: 4 }}
              tickLine={{ stroke: axisColour, strokeWidth: 4 }}
              padding={{ top: 20 }}
            />
            <Line
              type={lineType as CurveType}
              dataKey="value"
              stroke={lineColour}
              strokeWidth={Number(strokeWidth)}
              name="Values"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
