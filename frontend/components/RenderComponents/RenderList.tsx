import { ListComponentNode } from "@/app/types";
import { weightMap } from "@/helpers/constants";
import { AppDispatch } from "@/store";
import { editComponent } from "@/store/slices/builderSlice";
import { useDispatch } from "react-redux";

export default function RenderList({ list }: { list: ListComponentNode }) {
  console.log(list);

  const dispatch = useDispatch<AppDispatch>();

  const { props, styles } = list;

  const { items } = props as { items: string[] };

  const isOrdered = styles.listType === "ordered";
  const ListTag = isOrdered ? "ol" : "ul";
  return (
    <div>
      <ListTag
        onClick={() => {
          dispatch(editComponent({ id: list.id }));
        }}
        className={`${styles.font} cursor-pointer`}
        style={{
          listStyleType: isOrdered ? "decimal" : "disc",
          paddingLeft: "2rem",
          lineHeight: "1.6",
          fontWeight:
            weightMap[styles?.fontWeight as keyof typeof weightMap] ?? 400,
          fontSize: `${styles?.fontSizePx}px`,
          color: styles?.color,
          display: "flex",
          flexDirection: "column",
          gap: `${styles.listItemGap}px`,
        }}
      >
        {items.map((item, index) => {
          return (
            <li key={index}>
              <div className="flex items-center gap-2">
                <span>{item}</span>
              </div>
            </li>
          );
        })}
      </ListTag>
    </div>
  );
}
