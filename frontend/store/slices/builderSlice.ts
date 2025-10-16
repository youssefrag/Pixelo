import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

import {
  BuilderState,
  BuilderNode,
  isSection,
  isComponent,
  DraftState,
  ComponentKind,
} from "@/app/types";

import { isTextKind } from "@/helpers/type-helpers";

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
      state.ui.draft = null;
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
    clearDraft(state) {
      state.ui.draft = null;
    },
    select(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
      if (state.selectedId === null) return;

      state.ui.draft = null;

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

    // Logic for creating text components
    startTextDraft(
      state,
      action: PayloadAction<{
        kind: "heading" | "paragraph";
        parentId: string | null;
      }>
    ) {
      const { kind, parentId } = action.payload;
      const id = nanoid();

      state.ui.leftBar = { tab: "layout" };

      state.ui.draft = {
        draft: "text",
        id,
        type: "component",
        kind,
        targetParentId: parentId,
        props: { text: "" },
        styles: {
          variant: kind === "heading" ? "h2" : "p",
          textAlign: "left",
          font: "",
          fontSizePx: "32",
          fontWeight: "font-normal",
          color: "#000000",
        },
      };

      state.selectedId = id;
    },
    updateTextDraftContent(state, action: PayloadAction<string>) {
      if (!state.ui.draft) return;
      state.ui.draft.props.text = action.payload;
    },

    updateSelectedStyle(
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) {
      const { key, value } = action.payload;

      if (state.ui.draft) {
        state.ui.draft.styles[key] = value;
        return;
      }

      const id = state.selectedId;
      if (!id) return;

      const node = state.nodes[id];
      if (!node || node.type !== "component") return;

      node.styles[key] = value;
    },
    saveComponentDraft(
      state,
      action: PayloadAction<{
        id: string;
        kind: ComponentKind;
        parentId: string;
        styles: Record<string, string>;
        props: Record<string, unknown>;
      }>
    ) {
      const { id, kind, parentId } = action.payload;

      const parent = state.nodes[parentId];
      if (!parent || parent.type !== "section") return;

      let props: Record<string, unknown> = action.payload.props;

      switch (kind) {
        case "heading":
        case "paragraph": {
          const raw = props["text"];
          props = { text: typeof raw === "string" ? raw : "" };
          break;
        }
      }

      const styles = { ...action.payload.styles };

      const existing = state.nodes[id];

      if (!existing) {
        state.nodes[id] = {
          id,
          name: kind,
          parentId,
          depth: parent.depth + 1,
          styles,
          type: "component",
          kind,
          props,
        };
        parent.children.push(id);
      } else {
        if (existing.type !== "component") return;

        existing.styles = styles;
        existing.props = props;
      }

      state.ui.draft = null;
      state.selectedId = parentId;
      state.ui.leftBar.tab = "layout";
    },
    editComponent(
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) {
      const node = state.nodes[action.payload.id];

      if (!node || !isComponent(node)) return;

      if (!isTextKind(node.kind)) {
        // Not supported yet → clear draft (or just return; your call)
        state.ui.draft = null;
        return;
      }

      const rawText = (node.props as Record<string, unknown>)?.["text"];
      const text = typeof rawText === "string" ? rawText : "";

      state.ui.draft = {
        draft: "text",
        id: node.id,
        type: "component",
        kind: node.kind,
        targetParentId: node.parentId,
        styles: { ...node.styles },
        props: { text },
      };

      state.selectedId = action.payload.id;
    },
    deleteComponent(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const existing = state.nodes[id];

      if (existing) {
        const parentId = existing.parentId;
        if (parentId == null) {
          state.ui.draft = null;
          return;
        }

        const parent = state.nodes[parentId];

        delete state.nodes[id];

        if (parent && Array.isArray(parent.children)) {
          parent.children = parent.children.filter((childId) => childId !== id);
        }

        state.selectedId = parent?.id ?? null;
      } else {
        state.selectedId = state.ui.draft?.targetParentId ?? null;
      }

      state.ui.draft = null;
    },
  },
});

export const {
  select,
  addSection,
  openComponentPicker,
  closeComponentPicker,
  clearDraft,
  startTextDraft,
  updateTextDraftContent,
  updateSelectedStyle,
  saveComponentDraft,
  editComponent,
  deleteComponent,
} = builderSlice.actions;
export default builderSlice.reducer;
