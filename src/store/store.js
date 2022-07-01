import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import shortcutReducer from "./slice/shortcutSlice";
import menuReducer from "./slice/menuSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    shortcut: shortcutReducer,
    menu: menuReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["shortcut", "menu"],
      },
    }),
});

export default store;
