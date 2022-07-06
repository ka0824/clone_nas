import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalList: [],
  zIndex: 1200,
  zIndexList: [],
  modalCnt: 0,
  visibleList: [],
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    addModal: (state, action) => {
      state.modalList.push({
        id: action.payload.id,
        component: action.payload.component,
        icon: action.payload.icon,
      });
      state.modalCnt++;
      state.zIndexList.push({ id: action.payload.id, zIndex: state.zIndex++ });
      state.visibleList.push({ id: action.payload.id, visibility: "visible" });
    },
    removeModal: (state, action) => {
      state.modalList = state.modalList.filter(
        (el) => el.id !== action.payload
      );
      state.modalCnt--;
    },
    changeZindex: (state, action) => {
      state.zIndexList = state.zIndexList.map((el) => {
        if (el.id === action.payload) {
          state.zIndex = state.zIndex + state.modalList.length;
          return { id: el.id, zIndex: state.zIndex };
        } else {
          return el;
        }
      });
    },
    changeHidden: (state, action) => {
      state.visibleList = state.visibleList.map((el) => {
        if (el.id === action.payload) {
          return { id: el.id, visibility: "hidden" };
        } else {
          return el;
        }
      });
    },
    changeVisible: (state, action) => {
      state.visibleList = state.visibleList.map((el) => {
        if (el.id === action.payload) {
          return { id: el.id, visibility: "visible" };
        } else {
          return el;
        }
      });
    },
  },
});

export const {
  addModal,
  removeModal,
  changeZindex,
  changeHidden,
  changeVisible,
} = modalSlice.actions;
export default modalSlice.reducer;
