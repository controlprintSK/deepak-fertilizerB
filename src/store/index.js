// store/index.js
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userSlice from "../redux/userSlice";
// import createWebStorage from "redux-persist/es/storage/createWebStorage";
import rightSlice from "../redux/rightSlice";
import utilitiesListSlice from "../redux/utilitiesSlice";
import navBarSlice from "../redux/navBarSlice";


// function createWebStorage(type) {
//   try {
//     const storage = window[type];
//     storage.setItem("__test__", "__test__");
//     storage.removeItem("__test__");
//     return storage;
//   } catch (e) {
//     return {
//       getItem: () => null,
//       setItem: () => {},
//       removeItem: () => {},
//     };
//   }
// }

function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem: () => Promise.resolve(null),
      setItem: () => Promise.resolve(),
      removeItem: () => Promise.resolve(),
    };
  }
  return {
    getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
  };
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
