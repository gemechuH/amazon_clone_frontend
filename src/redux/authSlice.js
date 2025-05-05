import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores logged-in user's email
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = {
        uid: action.payload.uid || null, // Store user email after login
        email: action.payload.email || null,
        // displayName: action.payload.displayName || null,
      };
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null; // Reset user on logout
      state.loggedIn = false;
    },
  },
});

export const { loginUser, logoutUser}= authSlice.actions;
export default authSlice.reducer;
