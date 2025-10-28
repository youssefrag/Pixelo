import { FONT_OPTIONS, FONT_WEIGHTS } from "@/helpers/constants";
import { isListDraft } from "@/helpers/type-helpers";
import type { RootState, AppDispatch } from "@/store";
import {
  saveComponentDraft,
  select,
  updateSelectedStyle,
} from "@/store/slices/builderSlice";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ListEditor({ componentId }: { componentId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const { draft } = ui;

  if (!isListDraft(draft)) return;

  const styles = ui.draft?.styles;

  console.log(styles);

  const parentId = ui.draft?.targetParentId;

  // Logic for font change

  const font = styles?.font ?? "font-switzer";

  const onFontChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "font", value }));
  };

  // Logic for font weight

  const fontWeight = styles?.fontWeight ?? "font-normal";

  const onFontWeightChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "fontWeight", value }));
  };

  // Logic for font size

  const fontSizePx = styles?.fontSizePx;

  // Logic for text colour

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
    dispatch(updateSelectedStyle({ key: "color", value: newColor }));
  };

  // Logic for list item gap

  const listItemGap = styles?.listItemGap;

  // Logic for list type

  const listType = (styles?.listType as "ordered" | "unordered") ?? "unordered";

  const setListType = (value: "ordered" | "unordered") => {
    dispatch(updateSelectedStyle({ key: "listType", value }));
  };

  // Save and delete logic

  const handleSaveList = () => {
    dispatch(
      saveComponentDraft({
        id: draft.id,
        kind: "list",
        parentId: parentId || "",
        styles: draft.styles,
        props: draft.props,
      })
    );

    if (parentId === undefined) return;
    dispatch(select(parentId));
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
        <h2>Font Weight</h2>

        <div className="space-y-2 mt-3">
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            value={fontWeight}
            onChange={(e) => onFontWeightChange(e.target.value)}
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
        <h2>Font size</h2>
        <div>
          <input
            type="number"
            min={12}
            max={24}
            step={1}
            value={fontSizePx}
            onChange={(e) => {
              const value = Number(e.target.value);
              const clamped = Math.max(12, Math.min(24, value));
              dispatch(
                updateSelectedStyle({
                  key: "fontSizePx",
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
            Choose color
          </label>

          {/* color swatch button */}
          <button
            type="button"
            className="h-8 w-8 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: color }}
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
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="mt-2 w-full rounded border px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h2>List Item Gap</h2>
        <div>
          <input
            type="number"
            min={6}
            max={20}
            step={1}
            value={listItemGap}
            onChange={(e) => {
              const value = Number(e.target.value);
              const clamped = Math.max(6, Math.min(20, value));
              dispatch(
                updateSelectedStyle({
                  key: "listItemGap",
                  value: String(clamped),
                })
              );
            }}
            className="w-24 rounded border px-3 py-2 text-md font-semibold"
          />
        </div>
      </div>
      <div className="mb-4">
        <h2>List Type</h2>
        <div className="mt-3 flex items-center gap-6">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={listType === "unordered"}
              onChange={(e) => {
                if (e.target.checked) setListType("unordered");
                else setListType("ordered"); // keep one always selected
              }}
            />
            <span className="text-sm">Unordered</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={listType === "ordered"}
              onChange={(e) => {
                if (e.target.checked) setListType("ordered");
                else setListType("unordered");
              }}
            />
            <span className="text-sm">Ordered</span>
          </label>
        </div>
      </div>
      <div className="mt-4 flex justify-around">
        <button
          onClick={handleSaveList}
          className="bg-[#FF7A00] px-6 py-3 rounded-md text-white cursor-pointer"
        >
          Save
        </button>
        <button
          // onClick={handleDeleteParagraph}
          className="cursor-pointer"
        >
          Delete
        </button>
      </div>
    </>
  );
}
