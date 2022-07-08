import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import shortcutReducer from "./slice/shortcutSlice";
import menuReducer from "./slice/menuSlice";
import dragSelectReducer from "./slice/dragSelectSlice";
import modalReducer from "./slice/modalSlice";
import createSagaMiddleware from "@redux-saga/core";
import { all } from "@redux-saga/core/effects";
import { shortcutSaga } from "./slice/shortcutSlice";

const sagaMiddleware = createSagaMiddleware();

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
    }).concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([shortcutSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
