import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, authUser } from "./userAuth";

function getSessionId() {
  return document.cookie.split('; ').filter(row => row.startsWith('session_id=')).map(c => c.split('=')[1])[0];
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: getSessionId() ? true : false,
    username: '',
    password: '',
    cookie: getSessionId(),
    draftId: '-1',
  },
  reducers: {
    setIsLogin(state, action) {
      return { ...state, isLogin: action.payload };
    },
    setUserData(state, action) {
      return { ...state, userData: action.payload };
    },
    setCookie(state, _action) {
      return { ...state, cookie: getSessionId() };
    },
    setDraftId(state, action) {
      return { ...state, draftId: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLogin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.password = action.payload.user.password;
        state.isLogin = true;
        state.cookie = getSessionId();
        state.draftId = action.payload.order_id;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.username = '';
        state.password = '';
        state.isLogin = false;
        state.cookie = '';
        state.draftId = '-1';
        document.cookie = '';
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.password = action.payload.user.password;
        state.isLogin = true;
        state.cookie = getSessionId();
        state.draftId = action.payload.order_id;
      })
  },
})

export const { setIsLogin, setUserData } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
