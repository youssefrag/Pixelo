import { HeadingComponentNode } from "@/app/types";

import { getVariableStylesHeading } from "@/helpers/styling-helpers";

export default function RenderHeading({
  heading,
}: {
  heading: HeadingComponentNode;
}) {
  if (!heading) return null;

  const text = heading?.props.text as string;
  const styles = heading.styles;

  console.log(styles);

  const { headingVariantStyles, containerVariantStyles } =
    getVariableStylesHeading(styles);

  console.log(headingVariantStyles);
  console.log(containerVariantStyles);

  const safeHeadingClass = headingVariantStyles.replace(
    /text-\[[^\]]+\]\s?/g,
    ""
  );

  return (
    <div className={`flex ${containerVariantStyles}`}>
      <h2
        className={safeHeadingClass}
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
