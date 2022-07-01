import { createSlice } from "@reduxjs/toolkit";
import { FcFolder } from "react-icons/fc";

const initialState = [
  { id: 0, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 1, icon: <FcFolder></FcFolder>, title: "테스트용" },
];

const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {},
});

export const {} = menuSlice.actions;
export default menuSlice.reducer;
