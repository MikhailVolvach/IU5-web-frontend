import { createSlice } from "@reduxjs/toolkit";
import { EncryptionUser } from "../../api";
import { loginUser, logoutUser } from "./userAuth";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userData: {} as EncryptionUser,
  },
  reducers: {
    setIsLogin(state, action) {
      return { ...state, isLogin: action.payload };
    },
    setUserData(state, action) {
      return { ...state, userData: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLogin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLogin = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = {} as EncryptionUser;
        state.isLogin = false;
      })
  },
})

export const { setIsLogin, setUserData } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
