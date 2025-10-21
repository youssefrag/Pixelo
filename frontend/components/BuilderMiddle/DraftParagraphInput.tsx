import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { updateTextDraftContent } from "@/store/slices/builderSlice";
import { getVariableStylesParagraph } from "@/helpers/styling-helpers";
import { useLayoutEffect, useMemo, useRef } from "react";
import { isTextDraft } from "@/helpers/type-helpers";

export default function DraftParagraphInput() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  if (!isTextDraft(ui.draft)) return;

  const text = ui.draft?.props.text ?? "";

  const styles = ui.draft?.styles;

  const { paragraphVariantStyles, containerVariantStyles } = styles
    ? getVariableStylesParagraph(styles)
    : { paragraphVariantStyles: "", containerVariantStyles: "" };

  console.log({ paragraphVariantStyles, containerVariantStyles });

  const containerBase = "flex";
  const inputUI = `rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400`;

  // autosize on mount + when value or font-size changes
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  useLayoutEffect(() => {
    const el = taRef.current;
    if (!el) return;
    // Reset then grow to scrollHeight
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text, styles?.fontSizePx]); // re-measure when content or font size changes

  return (
    <div className={`${containerBase} ${containerVariantStyles}`}>
      <textarea
        ref={taRef}
        rows={3}
        value={text}
        onChange={(e) => {
          dispatch(updateTextDraftContent(e.target.value));
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        style={{
          fontSize: styles?.fontSizePx ? `${styles.fontSizePx}px` : undefined,
          color: styles?.color || undefined,
          width: `${styles?.width ?? 80}%`,
        }}
        className={`${inputUI} ${paragraphVariantStyles}`}
      ></textarea>
    </div>
  );
}
