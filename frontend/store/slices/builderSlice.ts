import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

import {
  BuilderState,
  BuilderNode,
  isSection,
  isComponent,
  DraftState,
} from "@/app/types";

const initialState: BuilderState = {
  rootOrder: [],
  nodes: {},
  selectedId: null,
  expanded: [],
  ui: {
    leftBar: { tab: "layout" },
    draft: null,
  },
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    openComponentPicker(state, action: PayloadAction<{ parentId: string }>) {
      state.ui.leftBar = {
        tab: "component",
        parentId: action.payload.parentId,
      };
    },
    closeComponentPicker(state) {
      state.ui.leftBar = {
        tab: "layout",
      };
    },
    addSection: {
      reducer: (
        state,
        action: PayloadAction<{
          id: string;
          name: string;
          parentId: string | null;
        }>
      ) => {
        const { id, name, parentId } = action.payload;

        const parent = parentId ? state.nodes[parentId] : undefined;

        const depth = parent ? parent.depth + 1 : 1;

        state.nodes[id] = {
          id,
          type: "section",
          name,
          parentId,
          children: [],
          styles: {},
          depth,
        };

        if (parent && isSection(parent)) parent.children.push(id);
        else state.rootOrder.push(id);

        state.selectedId = id;
      },
      prepare: (payload: { name: string; parentId?: string | null }) => {
        const id = nanoid();

        return {
          payload: {
            id,
            name: payload.name,
            parentId: payload.parentId ?? null,
          },
        };
      },
    },
    select(state, action: PayloadAction<string | null>) {
      console.log("REACHED HERE");
      state.selectedId = action.payload;
      if (state.selectedId === null) return;

      const startId = state.selectedId;

      state.expanded = [startId];

      let current: string | null = startId;
      const seen = new Set(state.expanded);

      while (current !== null) {
        const node: BuilderNode = state.nodes[current];
        if (!node) break;
        const parentId: string | null = node.parentId;
        if (parentId !== null && !seen.has(parentId)) {
          state.expanded.push(parentId);
          seen.add(parentId);
        }
        current = parentId;
      }
    },
    startTextDraft(
      state,
      action: PayloadAction<{
        kind: "heading" | "paragraph";
        parentId: string | null;
      }>
    ) {
      const { kind, parentId } = action.payload;
      const id = nanoid();

      state.ui.leftBar = { tab: "component", parentId: parentId ?? "" };

      state.ui.draft = {
        id,
        kind,
        targetParentId: parentId,
        props: { text: "" },
        styles: {
          vatiant: kind === "heading" ? "h2" : "p",
        },
      };

      state.selectedId = id;
    },
    updateTextDraftContent(state, action: PayloadAction<{ value: string }>) {
      if (!state.ui.draft) return;
      state.ui.draft.props.text = action.payload.value;
    },
    updateTextDraftStyle(
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) {
      if (!state.ui.draft) return;
      state.ui.draft.styles[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  select,
  addSection,
  openComponentPicker,
  closeComponentPicker,
  startTextDraft,
} = builderSlice.actions;
export default builderSlice.reducer;
