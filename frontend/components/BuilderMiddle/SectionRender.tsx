import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import DraftTextInput from "./DraftTextInput";

export default function SectionRender({ sectionId }: { sectionId: string }) {
  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const { draft } = ui;

  return (
    <div className="p-[10rem]">
      {draft && draft.targetParentId === sectionId && <DraftTextInput />}
    </div>
  );
}
