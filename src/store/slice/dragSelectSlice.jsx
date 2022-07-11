import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  dragTo: -1,
  dragFrom: -1,
  multi: [],
};

const dragSelectSlice = createSlice({
  name: "dragSelect",
  initialState,
  reducers: {
    addSelect: (state, action) => {
      !state.multi.includes(action.payload)
        ? state.multi.push(parseInt(action.payload))
        : state;
    },
    removeSelect: (state, action) => {
      state.multi = state.multi.filter((el) => el !== action.payload);
    },
    resetSelect: (state, action) => {
      state.multi = [];
    },
    selectDragTo: (state, action) => {
      state.dragTo = parseInt(action.payload);
    },
    selectDragFrom: (state, action) => {
      state.dragFrom = parseInt(action.payload);
    },
  },
});

export const {
  resetSelect,
  addSelect,
  removeSelect,
  selectDragTo,
  selectDragFrom,
} = dragSelectSlice.actions;
export default dragSelectSlice.reducer;
