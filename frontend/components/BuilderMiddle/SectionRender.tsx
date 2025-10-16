import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import DraftHeadingInput from "./DraftHeadingInput";
import RenderHeading from "../RenderComponents/RenderHeading";
import { BuilderNode, HeadingComponentNode } from "@/app/types";

export default function SectionRender({ sectionId }: { sectionId: string }) {
  const { nodes, ui } = useSelector((state: RootState) => state.builderSlice);
  const sectionNode = nodes[sectionId];
  const { draft } = ui;

  const renderedChildren = sectionNode.children?.map((childId) => {
    const child = nodes[childId] as BuilderNode;

    if (child.type === "section") {
      return <SectionRender key={child.id} sectionId={child.id} />;
    }

    if (child.type === "component") {
      switch (child.kind) {
        case "heading": {
          const isEditingThis =
            draft &&
            draft.id === child.id &&
            draft.targetParentId === sectionId;

          if (isEditingThis) return <DraftHeadingInput key={child.id} />;

          return (
            <RenderHeading
              key={child.id}
              heading={child as HeadingComponentNode}
            />
          );
        }
        default:
          return null; // TODO: add other kinds later
      }
    }

    return null;
  });

  const shouldAppendNewDraft =
    !!draft &&
    draft.draft === "text" &&
    !nodes[draft.id] &&
    draft.targetParentId === sectionId;

  return (
    <>
      {renderedChildren}
      {shouldAppendNewDraft && <DraftHeadingInput key={`draft-${sectionId}`} />}
    </>
  );
}
