import { createSlice } from "@reduxjs/toolkit";
import {
  FcFolder,
  FcAbout,
  FcCamera,
  FcFilingCabinet,
  FcKey,
  FcLinux,
  FcPrint,
  FcUnlock,
} from "react-icons/fc";

const initialState = [
  { id: 0, icon: <FcFolder draggable></FcFolder>, title: "테스트용1" },
  { id: 1, icon: <FcAbout draggable></FcAbout>, title: "테스트용2" },
  { id: 2, icon: <FcCamera draggable></FcCamera>, title: "테스트용3" },
  {
    id: 3,
    icon: <FcFilingCabinet draggable></FcFilingCabinet>,
    title: "테스트용4",
  },
  { id: 4, icon: <FcKey draggable></FcKey>, title: "테스트용5" },
  { id: 5, icon: <FcLinux draggable></FcLinux>, title: "테스트용6" },
  { id: 6, icon: <FcPrint draggable></FcPrint>, title: "테스트용7" },
  { id: 7, icon: <FcUnlock draggable></FcUnlock>, title: "테스트용8" },
];

const shortcutSlice = createSlice({
  name: "shortcutSlice",
  initialState,
  reducers: {
    addShortcut: (state, action) => {
      state.push({
        id: state.length + 1,
        icon: action.payload.icon,
        title: action.payload.title,
      });
    },
    removeShortcut: (state, action) => {
      return state.filter((el) => el.id !== action.payload);
    },
    removeMultiShortcut: (state, action) => {
      return state.filter((el) => {
        console.log(!action.payload.includes(el.id));

        return !action.payload.includes(el.id);
      });
    },
  },
});

export const { addShortcut, removeShortcut, removeMultiShortcut } =
  shortcutSlice.actions;
export default shortcutSlice.reducer;
