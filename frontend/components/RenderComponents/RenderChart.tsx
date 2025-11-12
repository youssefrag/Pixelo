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

  const { lineType, strokeColour, strokeWidth, widthPct } = chart.styles;

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
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type={lineType as CurveType}
              dataKey="value"
              stroke={strokeColour}
              strokeWidth={Number(strokeWidth)}
              name="Values"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
