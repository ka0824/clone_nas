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
  { id: 0, icon: <FcFolder draggable></FcFolder>, title: "새폴더" },
  { id: 1, icon: <FcAbout draggable></FcAbout>, title: "도움말" },
  { id: 2, icon: <FcCamera draggable></FcCamera>, title: "갤러리" },
  {
    id: 3,
    icon: <FcFilingCabinet draggable></FcFilingCabinet>,
    title: "탐색기",
  },
  { id: 4, icon: <FcKey draggable></FcKey>, title: "암호" },
  { id: 5, icon: <FcLinux draggable></FcLinux>, title: "리눅스" },
  { id: 6, icon: <FcPrint draggable></FcPrint>, title: "인쇄" },
  { id: 7, icon: <FcUnlock draggable></FcUnlock>, title: "잠금" },
];

const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {},
});

export const {} = menuSlice.actions;
export default menuSlice.reducer;
