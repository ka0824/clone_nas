import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import shortcutReducer from "./slice/shortcutSlice";
import menuReducer from "./slice/menuSlice";
import dragSelectReducer from "./slice/dragSelectSlice";
import modalReducer from "./slice/modalSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    shortcut: shortcutReducer,
    menu: menuReducer,
    dragSelect: dragSelectReducer,
    modal: modalReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["shortcut", "menu", "dragSelect", "modal"],
      },
    }),
});

export default store;
