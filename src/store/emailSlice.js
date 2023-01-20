import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "emails",
  initialState: { data: [], list: [] },
  reducers: {
    setEmails: (state, action) => {
      const emailArray = action.payload.list.map((email) => ({
        ...email,
      }));
      // state.list = action.payload.list.map((email) => ({
      //   ...email,
      // }));
      state.list = [...state.list, ...emailArray];
      state.data = action.payload.data;
    },

    markEmailRead: (state, action) => {
      state.list.map((email) => {
        if (email.id === action.payload) {
          email.isRead = true;
        }
      });
    },
    markEmailUnread: (state, action) => {
      state.list.map((email) => {
        if (email.id === action.payload) {
          email.isRead = false;
        }
      });
    },

    markEmailFavorite: (state, action) => {
      state.list.map((email) => {
        if (email.id === action.payload) {
          email.isFavorite = true;
        }
      });
    },

    markEmailUnfavorite: (state, action) => {
      state.list.map((email) => {
        if (email.id === action.payload) {
          email.isFavorite = false;
        }
      });
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

export const selectEmailsList = (state) => state.emails.list;
export const selectEmailsData = (state) => state.emails.data;

export default emailSlice.reducer;
