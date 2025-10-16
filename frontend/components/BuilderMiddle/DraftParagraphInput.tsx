import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { updateTextDraftContent } from "@/store/slices/builderSlice";

export default function DraftParagraphInput() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const text = ui.draft?.props.text ?? "";

  const styles = ui.draft?.styles;

  return (
    <div>
      <input
        value={text}
        onChange={(e) => dispatch(updateTextDraftContent(e.target.value))}
        className="border border-gray-400 rounded-sm bg-white px-2 py-1 shadow-sm"
      ></input>
    </div>
  );
}
