import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
  filteredEmails: [],
  filter: "all",
  selectedEmailId: null,
};

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails: (state, action) => {
      state.emails = action.payload.map((email) => ({
        ...email,
        isFavorite: false,
      }));
    },

    setFilteredEmails: (state, action) => {
      state.filteredEmails = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSelectedEmailId: (state, action) => {
      state.selectedEmailId = action.payload;
    },

    // markEmailRead: (state, action) => {
    //   const emailIndex = state.emails.findIndex(
    //     (email) => email.id === action.payload
    //   );
    //   state.emails[emailIndex].isRead = true;
    // },
    // markEmailUnread: (state, action) => {
    //   const emailIndex = state.emails.findIndex(
    //     (email) => email.id === action.payload
    //   );
    //   state.emails[emailIndex].isRead = false;
    // },

    markEmailRead: (state, action) => {
      state.emails.map((email) => {
        if (email.id === action.payload) {
          email.isRead = true;
        }
      });
    },
    markEmailUnread: (state, action) => {
      state.emails.map((email) => {
        if (email.id === action.payload) {
          email.isRead = false;
        }
      });
    },

    markEmailFavorite: (state, action) => {
      const emailIndex = state.emails.findIndex(
        (email) => email.id === action.payload
      );
      state.emails[emailIndex].isFavorite = true;
    },

    markEmailUnfavorite: (state, action) => {
      const emailIndex = state.emails.findIndex(
        (email) => email.id === action.payload
      );
      state.emails[emailIndex].isFavorite = false;
    },
  },
});

export const {
  setEmails,
  setFilteredEmails,
  setSelectedEmailId,
  setFilter,
  markEmailRead,
  markEmailUnread,
  markEmailFavorite,
  markEmailUnfavorite,
} = emailSlice.actions;

export const selectEmails = (state) => state.emails.emails;
export const selectFilteredEmails = (state) => state.emails.filteredEmails;
// export const selectFilter = (state) => state.emails.filter;
// export const selectAvatar = (state) => state.emails.from.name[0].toUpperCase();

export default emailSlice.reducer;
