import { FONT_OPTIONS, FONT_WEIGHTS } from "@/helpers/constants";
import { isTableDraft } from "@/helpers/type-helpers";
import { AppDispatch, RootState } from "@/store";
import {
  select,
  deleteComponent,
  saveComponentDraft,
  updateSelectedStyle,
} from "@/store/slices/builderSlice";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";

export default function TableEditor({ componentId }: { componentId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const styles = ui.draft?.styles;

  const parentId = ui.draft?.targetParentId;

  const font = styles?.font ?? "font-switzer";

  const onFontChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "font", value }));
  };

  // Heading Font Weight

  const headingFontWeight = styles?.headingFontWeight ?? "font-semibold";

  const onHeadingFontWeightChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "headingFontWeight", value }));
  };

  // Heading Font Size

  const headerFontSize = styles?.headerFontSize;

  // Logic for handling all colours

  const [isOpen, setIsOpen] = useState({
    headingText: false,
    headingBG: false,
    dataText: false,
    dataBG: false,
  });

  const refs = {
    headingText: useRef<HTMLDivElement>(null),
    headingBG: useRef<HTMLDivElement>(null),
    dataText: useRef<HTMLDivElement>(null),
    dataBG: useRef<HTMLDivElement>(null),
  };

  const triggerRefs = {
    headingText: useRef<HTMLButtonElement>(null),
    headingBG: useRef<HTMLButtonElement>(null),
    dataText: useRef<HTMLButtonElement>(null),
    dataBG: useRef<HTMLButtonElement>(null),
  };

  const anyOpen = Object.values(isOpen).some(Boolean);

  useEffect(() => {
    if (!anyOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;

      const containers = [
        refs.headingText.current,
        refs.headingBG.current,
        refs.dataText.current,
        refs.dataBG.current,
        // pressing ob buttons shouldn't count as outside
        triggerRefs.headingText.current,
        triggerRefs.headingBG.current,
        triggerRefs.dataText.current,
        triggerRefs.dataBG.current,
      ].filter(Boolean) as Node[];

      const clickedInsideAny = containers.some((node) => node.contains(target));

      if (!clickedInsideAny) {
        setIsOpen({
          headingText: false,
          headingBG: false,
          dataText: false,
          dataBG: false,
        });
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [anyOpen]);

  // heading bg

  const headingBGColour = styles?.headingBGColour || "#fff";

  const handleHeadingBGChange = (newColor: string) => {
    dispatch(updateSelectedStyle({ key: "headingBGColour", value: newColor }));
  };

  // Heading text colour

  const headingTextColour = styles?.headingTextColour;

  const handleHeadingTextColour = (newColor: string) => {
    dispatch(
      updateSelectedStyle({ key: "headingTextColour", value: newColor })
    );
  };

  // Data font weight

  const dataFontWeight = styles?.dataFontWeight ?? "font-normal";

  const onDataFontWeightChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "dataFontWeight", value }));
  };

  // Data Font Size

  const dataFontSize = styles?.dataFontSize;

  // Data bg

  const dataBGColour = styles?.dataBGColour || "#fff";

  const handleDataBGChange = (newColor: string) => {
    dispatch(updateSelectedStyle({ key: "dataBGColour", value: newColor }));
  };

  // Data text colour

  const dataTextColour = styles?.dataTextColour || "##000";

  const handleDataTextChange = (newColor: string) => {
    dispatch(updateSelectedStyle({ key: "dataTextColour", value: newColor }));
  };

  // Save and delete Table

  const handleSaveTable = () => {
    if (!isTableDraft(ui.draft)) {
      return;
    }
    dispatch(
      saveComponentDraft({
        id: componentId,
        kind: "table",
        parentId: parentId ?? "",
        styles: styles ?? {},
        props: { ...ui.draft?.props },
      })
    );

    dispatch(select(ui.draft.targetParentId));
  };

  const handleDeleteTable = () => {
    dispatch(deleteComponent({ id: componentId }));
  };

  return (
    <>
      <div className="mb-4">
        <h2>Font</h2>
        <div className="space-y-2 mt-3">
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            value={font}
            onChange={(e) => onFontChange(e.target.value)}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id || "default"} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-bold mb-2">Heading styles</h2>
        <h2>Heading Font Weight</h2>

        <div className="space-y-2 mt-3">
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            value={headingFontWeight}
            onChange={(e) => onHeadingFontWeightChange(e.target.value)}
          >
            {FONT_WEIGHTS.map((f) => (
              <option key={f.id || "default"} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <h2>Headers font size</h2>
        <div>
          <input
            type="number"
            min={16}
            max={32}
            step={1}
            value={headerFontSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              const clamped = Math.max(16, Math.min(32, value));
              dispatch(
                updateSelectedStyle({
                  key: "headerFontSize",
                  value: String(clamped),
                })
              );
            }}
            className="w-24 rounded border px-3 py-2 text-md font-semibold"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Heading background Colour
          </label>

          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm cursor-pointer"
            style={{ backgroundColor: headingBGColour }}
            onClick={() =>
              setIsOpen({
                headingText: false,
                headingBG: true,
                dataText: false,
                dataBG: false,
              })
            }
          />

          {isOpen.headingBG && (
            <div
              ref={refs.headingBG}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker
                color={headingBGColour}
                onChange={handleHeadingBGChange}
              />
              <input
                type="text"
                value={headingBGColour}
                onChange={(e) => handleHeadingBGChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Heading Text Colour
          </label>

          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm cursor-pointer"
            style={{ backgroundColor: headingTextColour }}
            onClick={() =>
              setIsOpen({
                headingText: true,
                headingBG: false,
                dataText: false,
                dataBG: false,
              })
            }
          />

          {isOpen.headingText && (
            <div
              ref={refs.headingText}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker
                color={headingTextColour}
                onChange={handleHeadingTextColour}
              />
              <input
                type="text"
                value={headingTextColour}
                onChange={(e) => handleHeadingTextColour(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-bold mb-2">Data styles</h2>
        <h2>Data Font Weight</h2>

        <div className="space-y-2 mt-3">
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            value={dataFontWeight}
            onChange={(e) => onDataFontWeightChange(e.target.value)}
          >
            {FONT_WEIGHTS.map((f) => (
              <option key={f.id || "default"} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <h2>Data font size</h2>
        <div>
          <input
            type="number"
            min={16}
            max={32}
            step={1}
            value={dataFontSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              const clamped = Math.max(16, Math.min(32, value));
              dispatch(
                updateSelectedStyle({
                  key: "dataFontSize",
                  value: String(clamped),
                })
              );
            }}
            className="w-24 rounded border px-3 py-2 text-md font-semibold"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Data background Colour
          </label>

          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm cursor-pointer"
            style={{ backgroundColor: dataBGColour }}
            onClick={() =>
              setIsOpen({
                headingText: false,
                headingBG: false,
                dataText: false,
                dataBG: true,
              })
            }
          />

          {isOpen.dataBG && (
            <div
              ref={refs.dataBG}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker
                color={dataBGColour}
                onChange={handleDataBGChange}
              />
              <input
                type="text"
                value={dataBGColour}
                onChange={(e) => handleDataBGChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <label className="text-sm text-neutral-600 block mb-2 font-bold">
            Data Text Colour
          </label>

          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm cursor-pointer"
            style={{ backgroundColor: dataTextColour }}
            onClick={() =>
              setIsOpen({
                headingText: false,
                headingBG: false,
                dataText: true,
                dataBG: false,
              })
            }
          />

          {isOpen.dataText && (
            <div
              ref={refs.dataText}
              className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
            >
              <HexColorPicker
                color={dataTextColour}
                onChange={handleDataTextChange}
              />
              <input
                type="text"
                value={dataTextColour}
                onChange={(e) => handleDataTextChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-around">
        <button
          onClick={handleSaveTable}
          className="bg-[#FF7A00] px-6 py-3 rounded-md text-white cursor-pointer"
        >
          Save
        </button>
        <button onClick={handleDeleteTable} className="cursor-pointer">
          Delete
        </button>
      </div>
    </>
  );
}
