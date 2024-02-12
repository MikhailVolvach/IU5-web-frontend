import { createSlice } from "@reduxjs/toolkit";
import { usersList } from "./usersList.ts";
import {EncryptionUser} from "api";

const usersListSlice = createSlice({
  name: 'usersList',
  initialState: {
    isLoaded: false,
    users: Array<EncryptionUser>(),
  },
  reducers: {
    setIsLoaded(state, _action) {
      return { ...state, isLoaded: true };
    },
    setUsers(state, action) {
      return { ...state, users: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersList.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(usersList.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.users = action.payload;
      })
      .addCase(usersList.rejected, (state, action) => {
        console.log(state, action.payload);
        state.isLoaded = true;
      })
  },
})

export const { setUsers, setIsLoaded } = usersListSlice.actions;

const usersListReducer = usersListSlice.reducer;

export default usersListReducer;
