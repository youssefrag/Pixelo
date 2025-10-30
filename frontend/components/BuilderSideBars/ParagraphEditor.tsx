import { AppDispatch, RootState } from "@/store";
import {
  deleteComponent,
  saveComponentDraft,
  select,
  updateSelectedStyle,
} from "@/store/slices/builderSlice";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";

import { FONT_OPTIONS, FONT_WEIGHTS } from "@/helpers/constants";
import { isTextDraft } from "@/helpers/type-helpers";

export default function ParagraphEditor({
  componentId,
}: {
  componentId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const styles = ui.draft?.styles;

  const parentId = ui.draft?.targetParentId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSelectedStyle({ key: "width", value: e.target.value }));
  };

  const onFontChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "font", value }));
  };

  const fontWeight = styles?.fontWeight ?? "font-normal";

  const onFontWeightChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "fontWeight", value }));
  };

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

  const handleSaveParagraph = () => {
    if (!isTextDraft(ui.draft)) {
      return;
    }
    dispatch(
      saveComponentDraft({
        id: componentId,
        kind: "paragraph",
        parentId: parentId ?? "",
        styles: styles ?? {},
        props: { text: ui.draft?.props.text },
      })
    );
    dispatch(select(ui.draft.targetParentId));
  };

  const handleDeleteParagraph = () => {
    dispatch(deleteComponent({ id: componentId }));
  };

  return (
    <>
      <div className="mb-[2rem]">
        <h2>Align Paragraph</h2>
        <div className="mt-4 flex gap-7 items-center">
          {styles && styles.textAlign === "left" ? (
            <div className="bg-[#FF7A00] text-white p-2 rounded">
              <FontAwesomeIcon icon={faAlignLeft} size="2x" />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faAlignLeft}
              size="2x"
              onClick={() =>
                dispatch(
                  updateSelectedStyle({ key: "textAlign", value: "left" })
                )
              }
              className="cursor-pointer"
            />
          )}
          {styles && styles.textAlign === "center" ? (
            <div className="bg-[#FF7A00] text-white p-2 rounded">
              <FontAwesomeIcon icon={faAlignCenter} size="2x" />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faAlignCenter}
              size="2x"
              onClick={() =>
                dispatch(
                  updateSelectedStyle({ key: "textAlign", value: "center" })
                )
              }
              className="cursor-pointer"
            />
          )}
          {styles && styles.textAlign === "right" ? (
            <div className="bg-[#FF7A00] text-white p-2 rounded">
              <FontAwesomeIcon icon={faAlignRight} size="2x" />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faAlignRight}
              size="2x"
              onClick={() =>
                dispatch(
                  updateSelectedStyle({ key: "textAlign", value: "right" })
                )
              }
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">
          Width: {styles?.width}%
        </label>
        <input
          type="range"
          min={10}
          max={100}
          step={10}
          value={styles?.width ?? 80}
          onChange={handleChange}
          className="w-full accent-gray-700 cursor-pointer"
        />
      </div>
      <div className="mb-4">
        <h2>Font</h2>
        <div className="space-y-2 mt-3">
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            value={styles?.font}
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
      <div className="mb-5">
        <h2 className="mb-3">Heading size (px)</h2>

        <div>
          {/* <label className="text-sm text-neutral-600"></label> */}
          <input
            type="number"
            min={16}
            max={40}
            step={1}
            value={styles?.fontSizePx ?? 32}
            onChange={(e) => {
              const value = Number(e.target.value);
              const clamped = Math.max(16, Math.min(40, value));
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
      <div className="mb-8">
        <h2 className="mb-3">Font weight</h2>

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
      <div>
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
      <div className="mt-4 flex justify-around">
        <button
          onClick={handleSaveParagraph}
          className="bg-[#FF7A00] px-6 py-3 rounded-md text-white cursor-pointer"
        >
          Save
        </button>
        <button onClick={handleDeleteParagraph} className="cursor-pointer">
          Delete
        </button>
      </div>
    </>
  );
}
