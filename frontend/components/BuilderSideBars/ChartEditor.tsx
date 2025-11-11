import { isChartDraft } from "@/helpers/type-helpers";
import { AppDispatch, RootState } from "@/store";
import { saveComponentDraft, select } from "@/store/slices/builderSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ChartEditor({ componentId }: { componentId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const styles = ui.draft?.styles;

  const parentId = ui.draft?.targetParentId;

  const handleSaveChart = () => {
    if (!isChartDraft(ui.draft)) {
      return;
    }

    dispatch(
      saveComponentDraft({
        id: componentId,
        kind: "chart",
        parentId: parentId ?? "",
        styles: styles ?? {},
        props: ui.draft?.props,
      })
    );

    dispatch(select(ui.draft.targetParentId));
  };

  return (
    <>
      ChartEditor
      <div className="mt-4 flex justify-around">
        <button
          onClick={handleSaveChart}
          className="bg-[#FF7A00] px-6 py-3 rounded-md text-white cursor-pointer"
        >
          Save
        </button>
        {/* <button onClick={handleDeleteheading} className="cursor-pointer">
          Delete
        </button> */}
      </div>
    </>
  );
}
