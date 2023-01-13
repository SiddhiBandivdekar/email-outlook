import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "emails",
  initialState: [],
  reducers: {
    setEmails: (state, action) => {
      state.push(...action.payload);
    },
    markEmailRead: (state, action) => {
      const emailIndex = state.findIndex(
        (email) => email.id === action.payload
      );
      state[emailIndex].read = true;
    },
    markEmailUnread: (state, action) => {
      const emailIndex = state.findIndex(
        (email) => email.id === action.payload
      );
      state[emailIndex].read = false;
    },
    markEmailFavorite: (state, action) => {
      const emailIndex = state.findIndex(
        (email) => email.id === action.payload
      );
      state[emailIndex].favorite = true;
    },
    markEmailUnfavorite: (state, action) => {
      const emailIndex = state.findIndex(
        (email) => email.id === action.payload
      );
      state[emailIndex].favorite = false;
    },
  },
});

export const {
  setEmails,
  markEmailRead,
  markEmailUnread,
  markEmailFavorite,
  markEmailUnfavorite,
} = emailSlice.actions;

export default emailSlice.reducer;
