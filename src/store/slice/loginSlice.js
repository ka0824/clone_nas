import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputId: "",
  isSubmitId: false,
  inputPassword: "",
  isSubmitPassword: false,
  loginPage: 1,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    changeId: (state, action) => {
      state.inputId = action.payload;
    },
    submitId: (state, action) => {
      state.isSubmitId = true;
    },
    changePassword: (state, action) => {
      state.inputPassword = action.payload;
    },
    submitPassword: (state, action) => {
      state.isSubmitPassword = true;
    },
    changeLoginPage: (state, action) => {
      state.loginPage = action.payload;
    },
  },
});

export const {
  changeId,
  submitId,
  changePassword,
  submitPassword,
  changeLoginPage,
} = loginSlice.actions;

export default loginSlice.reducer;
