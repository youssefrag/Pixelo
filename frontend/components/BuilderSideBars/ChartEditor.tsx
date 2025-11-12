import { isChartDraft } from "@/helpers/type-helpers";
import { AppDispatch, RootState } from "@/store";
import {
  deleteComponent,
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

  const [isOpen, setIsOpen] = useState({
    lineColour: false,
    axisColour: false,
    textColour: false,
  });

  const refs = {
    lineColour: useRef<HTMLDivElement>(null),
    axisColour: useRef<HTMLDivElement>(null),
    textColour: useRef<HTMLDivElement>(null),
  };

  const triggerRefs = {
    lineColour: useRef<HTMLButtonElement>(null),
    axisColour: useRef<HTMLButtonElement>(null),
    textColour: useRef<HTMLButtonElement>(null),
  };

  const anyOpen = Object.values(isOpen).some(Boolean);

  useEffect(() => {
    if (!anyOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;

      const containers = [
        refs.lineColour.current,
        refs.axisColour.current,
        refs.textColour.current,
        // pressing ob buttons shouldn't count as outside
        triggerRefs.lineColour.current,
        triggerRefs.axisColour.current,
        triggerRefs.textColour.current,
      ].filter(Boolean) as Node[];

      const clickedInsideAny = containers.some((node) => node.contains(target));

      if (!clickedInsideAny) {
        setIsOpen({
          lineColour: false,
          axisColour: false,
          textColour: false,
        });
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [anyOpen]);

  // line colour

  const lineColour = styles?.lineColour || "#000";

  const handleLineColourChange = (newColour: string) => {
    dispatch(updateSelectedStyle({ key: "lineColour", value: newColour }));
  };

  // axis colour

  const axisColour = styles?.axisColout || "#000";

  const handleAxisColourChange = (newColour: string) => {
    dispatch(updateSelectedStyle({ key: "axisColour", value: newColour }));
  };

  // text colour

  const textColour = styles?.textColour || "#000";

  const handleTextColourChange = (newColour: string) => {
    dispatch(updateSelectedStyle({ key: "textColour", value: newColour }));
  };

  // Logic chart width

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSelectedStyle({ key: "widthPct", value: e.target.value }));
  };

  // Logic for Save and Delete

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

  const handleDeleteChart = () => {
    dispatch(deleteComponent({ id: componentId }));
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
      <div className="mb-4">
        <label className="font-medium text-gray-700">
          Size: {styles?.widthPct}%
        </label>
        <input
          type="range"
          min={40}
          max={100}
          step={10}
          value={styles?.widthPct ?? 80}
          onChange={handleSizeChange}
          className="w-full accent-gray-700 cursor-pointer"
        />
      </div>
      <div>
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Line color
          </label>

          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: styles?.lineColour }}
            onClick={() =>
              setIsOpen({
                lineColour: true,
                axisColour: false,
                textColour: false,
              })
            }
          />

          {isOpen.lineColour && (
            <div
              ref={refs.lineColour}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker
                color={lineColour}
                onChange={handleLineColourChange}
              />
              <input
                type="text"
                value={styles?.lineColour ?? "#000000"}
                onChange={(e) => handleLineColourChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Axis color
          </label>

          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: styles?.axisColour }}
            onClick={() =>
              setIsOpen({
                lineColour: false,
                axisColour: true,
                textColour: false,
              })
            }
          />

          {isOpen.axisColour && (
            <div
              ref={refs.axisColour}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker
                color={axisColour}
                onChange={handleAxisColourChange}
              />
              <input
                type="text"
                value={styles?.axisColour ?? "#000000"}
                onChange={(e) => handleAxisColourChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Text color
          </label>

          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: styles?.textColour }}
            onClick={() =>
              setIsOpen({
                lineColour: false,
                axisColour: false,
                textColour: true,
              })
            }
          />

          {isOpen.textColour && (
            <div
              ref={refs.textColour}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker
                color={textColour}
                onChange={handleTextColourChange}
              />
              <input
                type="text"
                value={styles?.textColour ?? "#000000"}
                onChange={(e) => handleTextColourChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h2>Line Width</h2>
        <div>
          <input
            type="number"
            min={1}
            max={8}
            step={1}
            value={styles?.strokeWidth}
            onChange={(e) => {
              const value = Number(e.target.value);
              const clamped = Math.max(1, Math.min(8, value));
              dispatch(
                updateSelectedStyle({
                  key: "strokeWidth",
                  value: String(clamped),
                })
              );
            }}
            className="w-24 rounded border px-3 py-2 text-md font-semibold"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-around">
        <button
          onClick={handleSaveChart}
          className="bg-[#FF7A00] px-6 py-3 rounded-md text-white cursor-pointer"
        >
          Save
        </button>
        <button onClick={handleDeleteChart} className="cursor-pointer">
          Delete
        </button>
      </div>
    </>
  );
}
