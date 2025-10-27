import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import HeadingEditor from "./HeadingEditor";
import ParagraphEditor from "./ParagraphEditor";
import TableEditor from "./TableEditor";
import ListEditor from "./ListEditor";

export default function ComponentEditor() {
  const dispatch = useDispatch<AppDispatch>();
  const { nodes, selectedId, ui } = useSelector(
    (state: RootState) => state.builderSlice
  );

  if (!selectedId) return null;

  const draft = ui.draft && ui.draft.id === selectedId ? ui.draft : null;
  const node = nodes[selectedId];

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
    default:
      return null;
  }
}
