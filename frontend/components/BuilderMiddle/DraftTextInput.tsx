import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import { updateTextDraftContent } from "@/store/slices/builderSlice";

import { getVariableStylesHeading } from "../../helpers/styling-helpers";
import { useEffect, useMemo, useRef } from "react";

export default function DraftTextInput() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const text = ui.draft?.props.text ?? "";

  const styles = ui.draft?.styles;

  const { headingVariantStyles, containerVariantStyles } = styles
    ? getVariableStylesHeading(styles)
    : { headingVariantStyles: "", containerVariantStyles: "" };

  const safeHeadingClass = useMemo(
    () => headingVariantStyles.replace(/text-\[[^\]]+\]\s?/g, ""),
    [headingVariantStyles]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const sizerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const input = inputRef.current;
    const sizer = sizerRef.current;
    if (!input || !sizer) return;

    // reflect the current text (fallback to placeholder so it's never 0)
    sizer.textContent = text || input.placeholder || " ";

    // copy computed paddings/borders to add to measured text width
    const cs = getComputedStyle(input);
    const padLeft = parseFloat(cs.paddingLeft) || 0;
    const padRight = parseFloat(cs.paddingRight) || 0;
    const borderLeft = parseFloat(cs.borderLeftWidth) || 0;
    const borderRight = parseFloat(cs.borderRightWidth) || 0;
    const extras = padLeft + padRight + borderLeft + borderRight;

    // measure + set width
    const width = Math.ceil(sizer.offsetWidth + extras + 1); // +1 for caret
    input.style.width = `${Math.max(width, 1)}px`;
  }, [
    text,
    styles?.fontSizePx,
    styles?.fontWeight,
    styles?.font,
    styles?.color,
  ]);

  const containerBase = "flex";
  const inputUI = `rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 ${safeHeadingClass}`;

  return (
    <div className={`${containerBase} ${containerVariantStyles}`}>
      {/* Hidden sizer that mirrors the input's typography */}
      <span
        ref={sizerRef}
        className={safeHeadingClass}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre", // preserve spaces
          fontSize: styles?.fontSizePx ? `${styles.fontSizePx}px` : undefined,
          fontWeight: styles?.fontWeight as any,
          letterSpacing: "inherit",
        }}
        aria-hidden
      />
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => dispatch(updateTextDraftContent(e.target.value))}
        placeholder="Type heading..."
        className={inputUI}
        style={{
          fontSize: styles?.fontSizePx ? `${styles.fontSizePx}px` : undefined,
          color: styles?.color || undefined,
          width: 1,
          maxWidth: "100%",
          display: "inline-block",
        }}
      />
    </div>
  );
}
