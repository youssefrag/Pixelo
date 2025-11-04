import { isChartDraft } from "@/helpers/type-helpers";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function ChartDraft() {
  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const { draft } = ui;

  if (!draft) return null;

  if (!isChartDraft(draft)) return null;

  const { data } = draft.props;

  console.log(data);

  return <div>ChartDraft</div>;
}
