import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import DraftHeadingInput from "./DraftHeadingInput";
import DraftParagraphInput from "./DraftParagraphInput";
import RenderHeading from "../RenderComponents/RenderHeading";
import {
  BuilderNode,
  HeadingComponentNode,
  ParagraphComponentNode,
} from "@/app/types";
import RenderParagraph from "../RenderComponents/RenderParagraph";

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
        case "paragraph": {
          const isEditingThis =
            draft &&
            draft.id === child.id &&
            draft.targetParentId === sectionId;

          if (isEditingThis) return <DraftParagraphInput key={child.id} />;

          return (
            <RenderParagraph
              key={child.id}
              paragraph={child as ParagraphComponentNode}
            />
          );
        }
        default:
          return null; // TODO: add other kinds later
      }
    }

    return null;
  });

  const shouldAppendHeadingDraft =
    !!draft &&
    draft.kind === "heading" &&
    draft.draft === "text" &&
    !nodes[draft.id] &&
    draft.targetParentId === sectionId;

  const shouldAppendParagraphDraft =
    !!draft &&
    draft.kind === "paragraph" &&
    draft.draft === "text" &&
    !nodes[draft.id] &&
    draft.targetParentId === sectionId;

  // console.log(shouldAppendParagraphDraft);

  return (
    <>
      {renderedChildren}
      {shouldAppendHeadingDraft && (
        <DraftHeadingInput key={`draft-${sectionId}`} />
      )}
      {shouldAppendParagraphDraft && (
        <DraftParagraphInput key={`draft-${sectionId}`} />
      )}
    </>
  );
}
