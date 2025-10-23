import { createSlice, PayloadAction, nanoid, current } from "@reduxjs/toolkit";

import {
  BuilderState,
  BuilderNode,
  isSection,
  isComponent,
  DraftState,
  ComponentKind,
} from "@/app/types";

import { isTextKind, isTextDraft, isTableDraft } from "@/helpers/type-helpers";

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

function commitCurrentDraft(state: BuilderState) {
  const draft = state.ui.draft;
  if (!draft) return;

  const parentId = draft.targetParentId;
  if (!parentId) {
    state.ui.draft = null;
    return;
  }

  const parent = state.nodes[parentId];
  if (!parent || parent.type !== "section") {
    state.ui.draft = null;
    return;
  }

  let nextProps: Record<string, unknown>;
  if (isTextDraft(draft)) {
    nextProps = {
      text: typeof draft.props.text === "string" ? draft.props.text : "",
    };
  } else if (isTableDraft(draft)) {
    const headers = Array.isArray(draft.props.headers)
      ? draft.props.headers
      : [];
    const data = Array.isArray(draft.props.data) ? draft.props.data : [];
    nextProps = { headers, data };
  } else {
    state.ui.draft = null;
    return;
  }

  const existing = state.nodes[draft.id];
  if (!existing) {
    // Create
    state.nodes[draft.id] = {
      id: draft.id,
      name: draft.kind,
      parentId,
      depth: parent.depth + 1,
      styles: { ...draft.styles },
      type: "component",
      kind: draft.kind,
      props: nextProps,
    };
    if (!parent.children.includes(draft.id)) parent.children.push(draft.id);
  } else if (existing.type === "component") {
    existing.styles = { ...draft.styles };
    existing.props = nextProps;
  }

  state.selectedId = draft.id;
  state.ui.draft = null;
  state.ui.leftBar.tab = "layout";
}

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
      commitCurrentDraft(state);

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
    startHeadingDraft(
      state,
      action: PayloadAction<{
        parentId: string | null;
      }>
    ) {
      const { parentId } = action.payload;
      const id = nanoid();

      state.ui.leftBar = { tab: "layout" };

      state.ui.draft = {
        draft: "text",
        id,
        type: "component",
        kind: "heading",
        targetParentId: parentId,
        props: { text: "" },
        styles: {
          variant: "h2",
          textAlign: "left",
          font: "",
          fontSizePx: "32",
          fontWeight: "font-normal",
          color: "#000000",
        },
      };

      state.selectedId = id;
    },

    startParagraphDraft(
      state,
      action: PayloadAction<{
        parentId: string | null;
      }>
    ) {
      const { parentId } = action.payload;
      const id = nanoid();

      state.ui.leftBar = { tab: "layout" };

      state.ui.draft = {
        draft: "text",
        id,
        type: "component",
        kind: "paragraph",
        targetParentId: parentId,
        props: { text: "" },
        styles: {
          variant: "p",
          textAlign: "left",
          font: "",
          fontSizePx: "16",
          fontWeight: "font-normal",
          color: "#000000",
          lineHeight: "1.5",
          width: "80",
          rows: "3",
        },
      };

      state.selectedId = id;
    },

    // All logic for table draft

    startTableDraft(state, action: PayloadAction<{ parentId: string | null }>) {
      const { parentId } = action.payload;
      const id = nanoid();

      state.ui.leftBar = { tab: "layout" };

      state.ui.draft = {
        id,
        type: "component",
        kind: "table",
        targetParentId: parentId,
        props: {
          headers: ["name", "age", "occupation"],
          data: [
            ["Youssef", "21", "Engineer"],
            ["Jon Jones", "34", "Janitor"],
          ],
          editCell: null,
        },
        styles: {
          font: "",
          headingFontWeight: "font-semibold",
          headerFontSize: "20",
          headingBGColour: "#fff",
          headingTextColour: "#000",
          dataFontWeight: "font-normal",
          dataFontSize: "18",
          dataBGColour: "#fff",
          dataTextColour: "#000",
        },
      };

      state.selectedId = id;
    },

    addColTable(state) {
      const { draft } = state.ui;

      if (!isTableDraft(draft)) return;

      draft.props.headers.push("Header");

      for (let row of draft.props.data) {
        row.push("cell");
      }
    },

    addRowTable(state) {
      const { draft } = state.ui;

      if (!isTableDraft(draft)) return;

      const newRow = new Array(draft.props.headers.length).fill("cell");

      draft.props.data.push(newRow);
    },

    selectEditCell(state, action: PayloadAction<{ cellId: string }>) {
      const { draft } = state.ui;

      if (!isTableDraft(draft)) return;

      draft.props.editCell = action.payload.cellId;
    },

    updateCellDraftContent(state, action: PayloadAction<{ value: string }>) {
      if (!isTableDraft(state.ui.draft)) return;

      const cellLocation = state.ui.draft?.props.editCell?.split(" ");

      if (cellLocation && cellLocation[0] === "h") {
        state.ui.draft.props.headers[Number(cellLocation[1])] =
          action.payload.value;
      } else if (cellLocation && cellLocation[0] !== "h") {
        state.ui.draft.props.data[Number(cellLocation[0])][
          Number(cellLocation[1])
        ] = action.payload.value;
      }
    },

    deleteTableRow(state, action: PayloadAction<{ row: number }>) {
      if (!isTableDraft(state.ui.draft)) return;

      const row = action.payload.row;

      state.ui.draft?.props.data.splice(row, 1);
    },
    deleteTableCol(state, action: PayloadAction<{ col: number }>) {
      if (!isTableDraft(state.ui.draft)) return;

      const col = action.payload.col;

      state.ui.draft?.props.headers.splice(col, 1);

      for (let row of state.ui.draft?.props.data) {
        row.splice(col, 1);
      }

      if (!state.ui.draft?.props.headers.length) {
        state.selectedId = state.ui.draft.targetParentId;
        state.ui.draft = null;
      }
    },

    updateTextDraftContent(state, action: PayloadAction<string>) {
      if (!state.ui.draft) return;
      if (!isTextDraft(state.ui.draft)) return;
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
      commitCurrentDraft(state); // <-- add this

      const node = state.nodes[action.payload.id];

      if (!node || !isComponent(node)) return;

      switch (node.kind) {
        case "heading":
        case "paragraph": {
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
          break;
        }

        case "table": {
          const props = (node.props as Record<string, unknown>) || {};
          const headers = Array.isArray(props.headers)
            ? (props.headers as string[])
            : [];
          const data = Array.isArray(props.data)
            ? (props.data as string[][])
            : [];

          state.ui.draft = {
            id: node.id,
            type: "component",
            kind: "table",
            targetParentId: node.parentId,
            styles: { ...node.styles },
            props: {
              headers,
              data,
              editCell: null,
            },
          };
          break;
        }
        default:
          state.ui.draft = null;
          return;
      }

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
  startHeadingDraft,
  startParagraphDraft,
  startTableDraft,
  addColTable,
  addRowTable,
  deleteTableRow,
  deleteTableCol,
  selectEditCell,
  updateCellDraftContent,
  updateTextDraftContent,
  updateSelectedStyle,
  saveComponentDraft,
  editComponent,
  deleteComponent,
} = builderSlice.actions;
export default builderSlice.reducer;
