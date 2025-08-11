import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BuilderState = { selectedId: string | null };
const initialState: BuilderState = { selectedId: null };

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    select(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { select } = builderSlice.actions;
export default builderSlice.reducer;
