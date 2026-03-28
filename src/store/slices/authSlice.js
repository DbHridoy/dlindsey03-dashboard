import { createSlice } from "@reduxjs/toolkit";
import {
  clearAuthSession,
  readAuthSession,
  writeAuthSession,
} from "../../lib/authStorage";

const persistedSession = readAuthSession();

const initialState = {
  isAuthenticated: persistedSession.isAuthenticated,
  accessToken: persistedSession.accessToken,
  user: persistedSession.user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      const nextSession = {
        accessToken: action.payload?.accessToken || "",
        user: action.payload?.user || null,
      };

      state.isAuthenticated = Boolean(nextSession.accessToken);
      state.accessToken = nextSession.accessToken;
      state.user = nextSession.user;
      writeAuthSession(nextSession);
    },
    updateCurrentUser(state, action) {
      state.user = action.payload || null;

      if (state.accessToken) {
        writeAuthSession({
          accessToken: state.accessToken,
          user: state.user,
        });
      }
    },
    clearSession(state) {
      state.isAuthenticated = false;
      state.accessToken = "";
      state.user = null;
      clearAuthSession();
    },
  },
});

export const { setSession, updateCurrentUser, clearSession } = authSlice.actions;

export default authSlice.reducer;
