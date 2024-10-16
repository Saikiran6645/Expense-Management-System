// this are the slice of the redux store which is used to store the user information in the store and also to remove the user information from the store.
//basically slice is uses to store the user information in the store and also to remove the user information from the store.

import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //in reducer there will be function which will be used to store the user information in the store and also to remove the user information from the store.
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
