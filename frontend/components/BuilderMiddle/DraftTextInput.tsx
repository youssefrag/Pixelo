import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import { updateTextDraftContent } from "@/store/slices/builderSlice";

import { getVariableStylesHeading } from "../../helpers/styling-helpers";

export default function DraftTextInput() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const styles = ui.draft?.styles;
  console.log(styles);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTextDraftContent(e.target.value));
  };

  const containerBaseStyles = "flex";

  const inputBaseStyles = `w-[${Number(
    styles?.fontSizePx
  )}rem] rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400`;

  const { headingVariantStyles, containerVariantStyles } = styles
    ? getVariableStylesHeading(styles)
    : { headingVariantStyles: "", containerVariantStyles: "" };

  console.log(containerVariantStyles);
  console.log(headingVariantStyles);

  return (
    <div className={`${containerBaseStyles} ${containerVariantStyles}`}>
      <input
        type="text"
        onChange={handleTextChange}
        placeholder="Type your heading..."
        className={`${inputBaseStyles} ${headingVariantStyles.replace(
          /text-\[[^\]]+\]\s?/g,
          ""
        )}`}
        style={{ fontSize: `${styles?.fontSizePx ?? 32}px` }}
      />
    </div>
  );
}
