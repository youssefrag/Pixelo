import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

import { BuilderState } from "@/app/types";

const initialState: BuilderState = {
  rootOrder: [],
  nodes: {},
  selectedId: null,
  expanded: {},
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addSection: (
      state,
      action: PayloadAction<{ name: string; parentId?: string | null }>
    ) => {
      const id = nanoid();
      const parentId = action.payload.parentId ?? null;

      state.nodes[id] = {
        id,
        type: "section",
        name: action.payload.name,
        parentId: null,
        children: [],
      };

      if (parentId && state.nodes[parentId]) {
        state.nodes[parentId].children.push(id);
      } else {
        state.rootOrder.push(id);
      }
    },

    select(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    toggleExpand: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (!state.expanded) state.expanded = {};

      const prev = !!state.expanded[id];
      state.expanded[id] = !prev;
      state.expanded[id] = !state.expanded[id];
    },
  },
});

export const { select, addSection, toggleExpand } = builderSlice.actions;
export default builderSlice.reducer;
