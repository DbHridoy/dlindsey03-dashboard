import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  title: "Dashboard",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setPageTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { toggleSidebar, setPageTitle } = layoutSlice.actions;

export default layoutSlice.reducer;
