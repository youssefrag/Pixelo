import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store";

import HeadingEditor from "./HeadingEditor";

export default function ComponentEditor() {
  const dispatch = useDispatch<AppDispatch>();

  const { rootOrder, nodes, selectedId, ui } = useSelector(
    (state: RootState) => state.builderSlice
  );

  if (!selectedId) return;

  const componentType = nodes[selectedId]
    ? nodes[selectedId].type
    : ui.draft?.kind;

  const isDraft = selectedId === ui.draft?.id;

  if (componentType === "heading") {
    return <HeadingEditor componentId={selectedId} isDraft={isDraft} />;
  }
}
