import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = [];

const dragSelectSlice = createSlice({
  name: "dragSelect",
  initialState,
  reducers: {
    addSelect: (state, action) => {
      !state.includes(action.payload)
        ? state.push(parseInt(action.payload))
        : state;
    },
    removeSelect: (state, action) => {
      return state.filter((el) => el !== action.payload);
    },
    resetSelect: (state, action) => {
      return [];
    },
  },
});

export const { resetSelect, addSelect, removeSelect } = dragSelectSlice.actions;
export default dragSelectSlice.reducer;
