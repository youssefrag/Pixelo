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
  type WebStorage,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import userSlice from "./slices/userSlice";
import builderSlice from "./slices/builderSlice";

// Fallback storage for environments without window (e.g., SSR in Next.js)
const createNoopStorage = (): WebStorage => ({
  getItem(_key) {
    return Promise.resolve(null);
  },
  setItem(_key, _value) {
    return Promise.resolve(); // void
  },
  removeItem(_key) {
    return Promise.resolve(); // void
  },
});

const storage: WebStorage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  userSlice,
  builderSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["userSlice", "builderSlice"], // can also use `allowlist`
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
