import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import DraftHeadingInput from "./DraftHeadingInput";
import DraftParagraphInput from "./DraftParagraphInput";
import RenderHeading from "../RenderComponents/RenderHeading";
import RenderParagraph from "../RenderComponents/RenderParagraph";
import RenderTable from "../RenderComponents/RenderTable";
import RenderChart from "../RenderComponents/RenderChart";
import {
  BuilderNode,
  ChartComponentNode,
  HeadingComponentNode,
  ListComponentNode,
  ParagraphComponentNode,
  TableComponentNode,
} from "@/app/types";
import TableDraft from "./TableDraft";
import ListDraft from "./ListDraft";
import RenderList from "../RenderComponents/RenderList";
import ChartDraft from "./ChartDraft";
import ImageDraft from "./ImageDraft";

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
        case "table": {
          const isEditingThis =
            !!draft &&
            draft.id === child.id &&
            draft.targetParentId === sectionId &&
            draft.kind === "table";

          if (isEditingThis) return <TableDraft key={child.id} />;

          return (
            <RenderTable key={child.id} table={child as TableComponentNode} />
          );
        }
        case "list": {
          const isEditingThis =
            !!draft &&
            draft.id === child.id &&
            draft.targetParentId === sectionId &&
            draft.kind === "list";

          if (isEditingThis) return <ListDraft key={child.id} />;

          return (
            <RenderList key={child.id} list={child as ListComponentNode} />
          );
        }
        case "chart": {
          const isEditingThis =
            !!draft &&
            draft.id === child.id &&
            draft.targetParentId === sectionId &&
            draft.kind === "chart";

          console.log({ isEditingThis });

          if (isEditingThis) return <ChartDraft key={child.id} />;

          return (
            <RenderChart key={child.id} chart={child as ChartComponentNode} />
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

  const shouldAppendTableDraft =
    !!draft &&
    draft.kind === "table" &&
    !nodes[draft.id] &&
    draft.targetParentId === sectionId;

  const shouldAppendListDraft =
    !!draft &&
    draft.kind === "list" &&
    !nodes[draft.id] &&
    draft.targetParentId === sectionId;

  const shouldAppendChartDraft =
    !!draft &&
    draft.kind === "chart" &&
    !nodes[draft.id] &&
    draft.targetParentId === sectionId;

  const shouldAppendImageDraft =
    !!draft &&
    draft.kind === "image" &&
    !nodes[draft.id] &&
    draft.targetParentId === sectionId;

  return (
    <>
      {renderedChildren}
      {shouldAppendHeadingDraft && (
        <DraftHeadingInput key={`draft-${sectionId}`} />
      )}
      {shouldAppendParagraphDraft && (
        <DraftParagraphInput key={`draft-${sectionId}`} />
      )}
      {shouldAppendTableDraft && <TableDraft key={`draft-${sectionId}`} />}
      {shouldAppendListDraft && <ListDraft key={`draft-${sectionId}`} />}
      {shouldAppendChartDraft && <ChartDraft key={`draft-${sectionId}`} />}
      {shouldAppendImageDraft && <ImageDraft key={`draft-${sectionId}`} />}
    </>
  );
}
