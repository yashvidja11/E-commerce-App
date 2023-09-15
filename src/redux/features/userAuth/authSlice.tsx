

import { createSlice } from "@reduxjs/toolkit";

interface UserDataState {
  login: {
    password: string;
    email: string;
  };
  signUp: Array<{ email: string; username: string }>;
  error: string | null;
}

const initialState: UserDataState = {
  login: { password: "", email: "" },
  signUp: [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInInfo: (state, action) => {
      state.login = action.payload;
    },
    logOut: (state) => {
      state.login = { password: "", email: "" };
    },
    signUpInfo: (state, action) => {
      const existingUser = state.signUp.find(
        (user) => user.email === action.payload.email
      );
      if (existingUser) {
        state.error = "Email already exists";
      } else {
        state.signUp.push(action.payload);
        state.error = null;
      }
    },
    signupDatalocalstorage: (state, action) => {
      state.signUp = action.payload;
    },
    updateUserProfile: (state, action) => {
      const { email } = action.payload;
      const existingUser = state.signUp.find((user) => user.email === email);
      if (existingUser) {
        Object.assign(existingUser, action.payload);
      }
    },
    
  },
});

export const {
  signInInfo,
  signUpInfo,
  logOut,
  signupDatalocalstorage,
  updateUserProfile

} = authSlice.actions;

export default authSlice.reducer;


