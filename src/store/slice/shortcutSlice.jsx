import { createSlice } from "@reduxjs/toolkit";
import { FcFolder } from "react-icons/fc";

const initialState = [
  { id: 0, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 1, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 2, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 3, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 4, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 5, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 6, icon: <FcFolder></FcFolder>, title: "테스트용" },
  { id: 7, icon: <FcFolder></FcFolder>, title: "테스트용" },
];

const shortcutSlice = createSlice({
  name: "shortcutSlice",
  initialState,
  reducers: {
    addShortcut: (state, action) => {},
    removeShortcut: (state, action) => {
      return state.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addShortcut, removeShortcut } = shortcutSlice.actions;
export default shortcutSlice.reducer;
