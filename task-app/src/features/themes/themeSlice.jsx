import { createSlice } from "@reduxjs/toolkit";
import themes from "./themes";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: themes[0],
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
