import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.message = "";
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    // Reducer for starting a user profile update
    updateStart: (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Clear any previous errors
    },
    // Reducer for successful user profile update
    updateSuccess: (state, action) => {
      state.currentUser = action.payload.data; // Update the current user with new data
      state.message = action.payload.message;
      state.loading = false; // Stop loading
      state.error = null; // Clear any errors
    },
    // Reducer for user profile update failure
    updateFailure: (state, action) => {
      state.loading = false; // Stop loading
      state.error = action.payload; // Set the error message
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} = userSlice.actions;

export default userSlice.reducer;
