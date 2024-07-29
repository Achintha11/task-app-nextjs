import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { toggleCollapsed } = navbarSlice.actions;

export default navbarSlice.reducer;
