import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSlice {
  name: string;
}

const initialState: UserSlice = { name: "" };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setName } = counterSlice.actions;
export default counterSlice.reducer;
