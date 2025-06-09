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

// Custom storage handler for server-side rendering support
function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem: async () => null,
      setItem: async () => {},
      removeItem: async () => {},
    };
  } else {
    return createWebStorage("local");
  }
}

const storage = createPersistStore();

// Redux Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//  Combine reducers
const rootReducer = combineReducers({
  userInfo: userSlice,
  rightInfo: rightSlice,
  utilities: utilitiesListSlice,
  navBarInfo: navBarSlice,
});

//  Wrap reducers with persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Create the store with serializable check disabled for redux-persist actions
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export default store;
