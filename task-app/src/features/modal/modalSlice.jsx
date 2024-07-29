import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  modalData: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalData = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
