import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";

import { updateSelectedStyle } from "@/store/slices/builderSlice";

const FONT_OPTIONS = [
  { id: "", label: "Switzer" },
  { id: "font-inter", label: "Inter" },
  { id: "font-playfair", label: "Playfair Display" },
  { id: "font-poppins", label: "Poppins" },
  { id: "font-bebas", label: "Bebas Neue" },
  { id: "font-pacifico", label: "Pacifico" },
];

const FONT_WEIGHTS = [
  { id: "font-extralight", label: "Extra Light" },
  { id: "font-light", label: "Light" },
  { id: "font-normal", label: "Normal" },
  { id: "font-medium", label: "Medium" },
  { id: "font-semibold", label: "Semi Bold" },
  { id: "font-bold", label: "Bold" },
  { id: "font-extrabold", label: "Extra Bold" },
];

export default function HeadingEditor({
  componentId,
  isDraft,
}: {
  componentId: string;
  isDraft: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { rootOrder, nodes, ui } = useSelector(
    (state: RootState) => state.builderSlice
  );

  const styles = isDraft ? ui.draft?.styles : nodes[componentId].styles;

  const font = styles?.font ?? "font-switzer";

  const onFontChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "font", value }));
  };

  // logic for weight

  const fontWeight = styles?.fontWeight ?? "font-normal";

  const onFontWeightChange = (value: string) => {
    dispatch(updateSelectedStyle({ key: "fontWeight", value }));
  };

  return (
    <>
      <div className="mb-[2rem]">
        <h2>Align Heading</h2>
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
      <div className="mb-5">
        <h2 className="mb-3">Heading size (px)</h2>

        <div>
          {/* <label className="text-sm text-neutral-600"></label> */}
          <input
            type="number"
            min={16}
            max={96}
            step={1}
            value={styles?.fontSizePx ?? 32} // keep whatever type you store
            onChange={(e) =>
              dispatch(
                updateSelectedStyle({
                  key: "fontSizePx",
                  value: e.target.value,
                })
              )
            }
            className="w-24 rounded border px-3 py-2 text-md font-semibold"
          />
        </div>
      </div>
      <div>
        <h2 className="mb-3">Heading weight</h2>

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
    </>
  );
}
