// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userSlice from "../redux/userSlice";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import rightSlice from "../redux/rightSlice";
import utilitiesListSlice from "../redux/utilitiesSlice";
import navBarSlice from "../redux/navBarSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  } else {
    return createWebStorage("local");
  }
}

const storage = createPersistStore();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  userInfo: userSlice,
  rightInfo: rightSlice,
  utilities: utilitiesListSlice,
  navBarInfo: navBarSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isTest = process.env.NODE_ENV === "test";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(isTest ? [] : logger),
});

export default store;
