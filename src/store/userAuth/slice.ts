import { createSlice } from "@reduxjs/toolkit";
import { EncryptionUser } from "../../api";
import { loginUser, logoutUser, authUser } from "./userAuth";

const sessionId = document.cookie.split('; ').filter(row => row.startsWith('session_id=')).map(c => c.split('=')[1])[0];

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: sessionId ? true : false,
    // isLogin: false,
    userData: {} as EncryptionUser,
    cookie: sessionId,
    orderId: '-1',
  },
  reducers: {
    setIsLogin(state, action) {
      return { ...state, isLogin: action.payload };
    },
    setUserData(state, action) {
      return { ...state, userData: action.payload };
    },
    setCookie(state, _action) {
      return { ...state, cookie: sessionId };
    },
    setOrderId(state, action) {
      return { ...state, cookie: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLogin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLogin = true;
        state.cookie = sessionId;
        state.orderId = action.payload.orderId;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = {} as EncryptionUser;
        state.isLogin = false;
        state.cookie = '';
        document.cookie = '';
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLogin = true;
        state.cookie = sessionId;
        state.orderId = action.payload.orderId;
      })
  },
})

export const { setIsLogin, setUserData } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
