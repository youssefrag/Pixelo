import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import HeadingEditor from "./HeadingEditor";
import ParagraphEditor from "./ParagraphEditor";
import TableEditor from "./TableEditor";
import ListEditor from "./ListEditor";
import ChartEditor from "./ChartEditor";
import ImageEditor from "./ImageEditor";

export default function ComponentEditor() {
  const dispatch = useDispatch<AppDispatch>();
  const { nodes, selectedId, ui } = useSelector(
    (state: RootState) => state.builderSlice
  );

  if (!selectedId) return null;

  const draft = ui.draft && ui.draft.id === selectedId ? ui.draft : null;
  const node = nodes[selectedId];
  console.log({ ui, draft, node });

  const kind =
    draft?.kind ?? (node && node.type === "component" ? node.kind : undefined);

  switch (kind) {
    case "heading":
      return <HeadingEditor componentId={selectedId} />;
    case "paragraph":
      return <ParagraphEditor componentId={selectedId} />;
    case "table":
      return <TableEditor componentId={selectedId} />;
    case "list":
      return <ListEditor componentId={selectedId} />;
    case "chart":
      return <ChartEditor componentId={selectedId} />;
    case "image":
      return <ImageEditor componentId={selectedId} />;
    default:
      return null;
  }
}
