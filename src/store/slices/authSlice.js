import { createSlice } from "@reduxjs/toolkit";
import { readAuthSession } from "../../lib/authStorage";

const initialState = {
  isAuthenticated: readAuthSession(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state) {
      state.isAuthenticated = true;
    },
    logOut(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
