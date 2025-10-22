import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

import { HeadingComponentNode } from "@/app/types";

import {  editComponent } from "@/store/slices/builderSlice";
import {getVariableStylesHeading } from "@/helpers/styling-helpers";

export default function RenderHeading({
  heading,
}: {
  heading: HeadingComponentNode;
}) {
  if (!heading) return null;

  const dispatch = useDispatch<AppDispatch>();

  const text = heading?.props.text as string;
  const styles = heading.styles;

  const { headingVariantStyles, containerVariantStyles } =
    getVariableStylesHeading(styles);

  const safeHeadingClass = headingVariantStyles.replace(
    /text-\[[^\]]+\]\s?/g,
    ""
  );

  return (
    <div className={`flex ${containerVariantStyles}`}>
      <h2
        onClick={() => {
          dispatch(editComponent({ id: heading.id }));
        }}
        className={`${safeHeadingClass} cursor-pointer`}
        style={{
          fontSize: styles?.fontSizePx ? `${styles.fontSizePx}px` : undefined,
          color: styles?.color || undefined,
        }}
      >
        {text}
      </h2>
    </div>
  );
}
