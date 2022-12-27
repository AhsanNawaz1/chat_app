import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.user = action.payload || null;
      state.token = action.payload || null;
    },
    signup: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.email = action.payload.email
      state.password = action.payload.password
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
