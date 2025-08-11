import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import builderSlice from "./slices/builderSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    builderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
