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
  headingVariantStyles += ` ${styles.fontWeight}`;
  headingVariantStyles += ` text-[${styles.color}]`;

  return { headingVariantStyles, containerVariantStyles };
}

export function getVariableStylesParagraph(styles: Record<string, string>): {
  paragraphVariantStyles: string;
  containerVariantStyles: string;
} {
  let paragraphVariantStyles = "";
  let containerVariantStyles = "";

  switch (styles.textAlign) {
    case "left":
      containerVariantStyles += "justify-start ";
      paragraphVariantStyles += "text-left ";
      break;
    case "center":
      containerVariantStyles += "justify-center ";
      paragraphVariantStyles += "text-center ";
      break;
    case "right":
      containerVariantStyles += "justify-end ";
      paragraphVariantStyles += "text-right ";
      break;
  }

  paragraphVariantStyles += styles.font;
  paragraphVariantStyles += ` ${styles.fontWeight}`;

  containerVariantStyles += ` w-[${styles.width}%]`;

  return { paragraphVariantStyles, containerVariantStyles };
}

export function getVariableStylesTable(styles: Record<string, string>): {
  tableVariantStyles: string;
} {
  let tableVariantStyles = "";

  tableVariantStyles += `${styles.font}`;

  return { tableVariantStyles };
}
