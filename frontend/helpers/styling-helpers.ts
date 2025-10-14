export function getVariableStylesHeading(styles: Record<string, string>): {
  headingVariantStyles: string;
  containerVariantStyles: string;
} {
  let headingVariantStyles = "";
  let containerVariantStyles = "";

  switch (styles.textAlign) {
    case "left":
      containerVariantStyles += "justify-start ";
      break;
    case "center":
      containerVariantStyles += "justify-center ";
      break;
    case "right":
      containerVariantStyles += "justify-end ";
      break;
  }

  headingVariantStyles += styles.font;
  headingVariantStyles += ` text-[${styles.fontSizePx}px]`;

  return { headingVariantStyles, containerVariantStyles };
}
