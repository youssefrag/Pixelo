import { AppDispatch, RootState } from "@/store";
import { updateSelectedStyle } from "@/store/slices/builderSlice";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

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

export default function ParagraphEditor({
  componentId,
}: {
  componentId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const styles = ui.draft?.styles;

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
    </>
  );
}
