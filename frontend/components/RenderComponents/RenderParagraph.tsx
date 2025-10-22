import { ParagraphComponentNode } from "@/app/types";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { getVariableStylesParagraph } from "@/helpers/styling-helpers";
import { editComponent } from "@/store/slices/builderSlice";

export default function RenderParagraph({
  paragraph,
}: {
  paragraph: ParagraphComponentNode;
}) {
  if (!paragraph) return null;

  const dispatch = useDispatch<AppDispatch>();

  const text = paragraph?.props.text as string;
  const styles = paragraph.styles;

  const { paragraphVariantStyles, containerVariantStyles } =
    getVariableStylesParagraph(styles);

  const safeParagraphClass = paragraphVariantStyles.replace(
    /text-\[[^\]]+\]\s?/g,
    ""
  );

  return (
    <div
      className={`flex ${containerVariantStyles} min-w-0`} // flex item can shrink
    >
      <p
        onClick={() => dispatch(editComponent({ id: paragraph.id }))}
        className={`${safeParagraphClass} cursor-pointer whitespace-pre-wrap break-words min-w-0`} // allow wrapping + shrinking
        style={{
          fontSize: styles?.fontSizePx ? `${styles.fontSizePx}px` : undefined,
          color: styles?.color || undefined,
          width: styles?.width ? `${styles.width}%` : "80%",
        }}
      >
        {text}
      </p>
    </div>
  );
}
