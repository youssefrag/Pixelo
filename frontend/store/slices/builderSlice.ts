import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

import { BuilderState } from "@/app/types";

const initialState: BuilderState = {
  rootOrder: [],
  nodes: {},
  selectedId: null,
  expanded: [],
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

      const parent = parentId ? state.nodes[parentId] : undefined;
      const depth = parent ? parent.depth + 1 : 1;

      state.nodes[id] = {
        id,
        type: "section",
        name: action.payload.name,
        parentId,
        children: [],
        depth,
      };

      if (parent) {
        parent.children.push(id);
      } else {
        state.rootOrder.push(id);
      }
      state.selectedId = id;
      state.expanded = [id];
    },

    select(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { select, addSection } = builderSlice.actions;
export default builderSlice.reducer;
