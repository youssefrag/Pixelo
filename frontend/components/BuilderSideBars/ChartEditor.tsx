import { isChartDraft } from "@/helpers/type-helpers";
import { AppDispatch, RootState } from "@/store";
import {
  saveComponentDraft,
  select,
  updateSelectedStyle,
} from "@/store/slices/builderSlice";
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
      <div className="mb-4">
        <h2>Line Type</h2>
        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              value="monotone"
              checked={styles?.lineType === "monotone"}
              onChange={() =>
                dispatch(
                  updateSelectedStyle({
                    key: "lineType",
                    value: "monotone",
                  })
                )
              }
            />
            Monotone
          </label>
          <label>
            <input
              type="checkbox"
              value="linear"
              checked={styles?.lineType === "linear"}
              onChange={() =>
                dispatch(
                  updateSelectedStyle({
                    key: "lineType",
                    value: "linear",
                  })
                )
              }
            />
            Linear
          </label>
          <label>
            <input
              type="checkbox"
              value="step"
              checked={styles?.lineType === "step"}
              onChange={() =>
                dispatch(
                  updateSelectedStyle({
                    key: "lineType",
                    value: "step",
                  })
                )
              }
            />
            Step
          </label>
        </div>
      </div>
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
