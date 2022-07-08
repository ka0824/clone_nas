import { createSlice } from "@reduxjs/toolkit";
import { fetchShortcutList } from "./../../api/shortcutApi";
import { call, put, delay, takeEvery } from "redux-saga/effects";
import iconsList from "./../../data/iconsList";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const shortcutSlice = createSlice({
  name: "shortcutSlice",
  initialState,
  reducers: {
    getShortcut: (state, action) => {
      state.loading = true;
    },
    getShortcutS: (state, action) => {
      state.list = action.payload.map((el) => ({
        id: el.id,
        title: el.title,
        icon: iconsList[el.type],
      }));
      state.loading = false;
    },
    getShortcutE: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addShortcut: (state, action) => {
      state.list.push({
        id: state.length + 1,
        icon: action.payload.icon,
        title: action.payload.title,
      });
    },
    removeShortcut: (state, action) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    removeMultiShortcut: (state, action) => {
      state.list = state.list.filter((el) => {
        return !action.payload.includes(el.id);
      });
    },
  },
});

function* getShortcutSaga(action) {
  try {
    const list = yield call(fetchShortcutList, action.payload);
    console.log(list);
    yield put(getShortcutS(list));
  } catch (error) {
    yield put(getShortcutE(error));
  }
}

export function* shortcutSaga() {
  yield takeEvery(getShortcut, getShortcutSaga);
}

export const {
  addShortcut,
  removeShortcut,
  removeMultiShortcut,
  getShortcut,
  getShortcutS,
  getShortcutE,
} = shortcutSlice.actions;
export default shortcutSlice.reducer;
