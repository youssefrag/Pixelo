import { ImageComponentNode } from "@/app/types";
import { AppDispatch } from "@/store";
import { editComponent } from "@/store/slices/builderSlice";
import { useDispatch } from "react-redux";

export default function RenderImage({ image }: { image: ImageComponentNode }) {
  if (!image) return null;

  const dispatch = useDispatch<AppDispatch>();

  const url = image.props.url as string;

  const { styles } = image;

  const { widthPct, brightness, borderRadius } = styles;

  return (
    <div>
      {url && (
        <div
          onClick={() => dispatch(editComponent({ id: image.id }))}
          className="rounded-xl overflow-hidden bg-black/20 cursor-pointer"
          style={{
            width: `${widthPct}%`,
            borderRadius: `${borderRadius}%`,
            filter: `brightness(${brightness}%)`,
          }}
        >
          <img src={url} alt="" className="block w-full h-auto" />
        </div>
      )}
    </div>
  );
}
