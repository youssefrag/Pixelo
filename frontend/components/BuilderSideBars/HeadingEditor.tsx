import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";

import { updateSelectedStyle } from "@/store/slices/builderSlice";

// type FontOption = {
//   id: string;
//   label: string;
// };

const FONT_OPTIONS = [
  { id: "", label: "Switzer" },
  { id: "font-inter", label: "Inter" },
  { id: "font-playfair", label: "Playfair Display" },
  { id: "font-poppins", label: "Poppins" },
  { id: "font-bebas", label: "Bebas Neue" },
  { id: "font-pacifico", label: "Pacifico" },
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

  const selectedFont =
    FONT_OPTIONS.find((f) => f.id === font) ?? FONT_OPTIONS[0];

  console.log(styles);

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
      <div>
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
    </>
  );
}
