import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import userSlice from "./slices/userSlice";
import builderSlice from "./slices/builderSlice";

const createNoopStorage = () => ({
  getItem: async (_key: string) => null,
  setItem: async (_key: string, _value: string) => {},
  removeItem: async (_key: string) => {},
});

const storage =
  typeof window !== "undefined"
    ? (await import("redux-persist/lib/storage")).default
    : createNoopStorage();

const rootReducer = combineReducers({ userSlice, builderSlice });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["userSlice", "builderSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
