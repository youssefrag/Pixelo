import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import HeadingEditor from "./HeadingEditor";

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

  const isDraft = Boolean(draft);

  switch (kind) {
    case "heading":
      return <HeadingEditor componentId={selectedId} isDraft={isDraft} />;
    case "paragraph":
      return null;
    default:
      return null;
  }
}
