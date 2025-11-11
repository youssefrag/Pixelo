import { isChartDraft } from "@/helpers/type-helpers";
import { AppDispatch, RootState } from "@/store";
import {
  saveComponentDraft,
  select,
  updateSelectedStyle,
} from "@/store/slices/builderSlice";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";

export default function ChartEditor({ componentId }: { componentId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const styles = ui.draft?.styles;

  const parentId = ui.draft?.targetParentId;

  // Logic for stroke colour

  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);

  const color = styles?.color;

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (popover.current && !popover.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const handleColorChange = (newColor: string) => {
    dispatch(updateSelectedStyle({ key: "strokeColour", value: newColor }));
  };

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
      <div>
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Choose color
          </label>

          {/* color swatch button */}
          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: styles?.strokeColour }}
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div
              ref={popover}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker color={color} onChange={handleColorChange} />
              <input
                type="text"
                value={styles?.strokeColour ?? "#000000"}
                onChange={(e) => handleColorChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
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
