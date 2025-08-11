import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

type NodeType = "section" | "component";

type BuilderNode = {
  id: string;
  type: NodeType;
  name: string;
  parentId: string | null;
  children: string[];
};

type BuilderState = {
  rootOrder: string[];
  nodes: Record<string, BuilderNode>;
  selectedId: string | null;
};

const initialState: BuilderState = {
  rootOrder: [],
  nodes: {},
  selectedId: null,
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<{ name: string }>) => {
      const id = nanoid();
      state.nodes[id] = {
        id,
        type: "section",
        name: action.payload.name,
        parentId: null,
        children: [],
      };
      state.rootOrder.push(id);
    },
    select(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { select } = builderSlice.actions;
export default builderSlice.reducer;
