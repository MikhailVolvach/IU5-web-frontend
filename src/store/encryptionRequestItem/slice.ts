import { createSlice } from "@reduxjs/toolkit";
import { DataEncryptionRequest } from "../../api";
import { getEncryptionRequestItem } from "./getEncryptionRequestItem";

const encryptionRequestItemSlice = createSlice({
  name: 'encryptionRequestItem',
  initialState: {
    isLoaded: false,
    request: Array<DataEncryptionRequest>(),
  },
  reducers: {
    setIsLoaded(state, _action) {
      return { ...state, isLoaded: true };
    },
    setRequest(state, action) {
      return { ...state, request: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEncryptionRequestItem.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getEncryptionRequestItem.fulfilled, (state, action) => {
        state.request = action.payload;
        state.isLoaded = true;
      })
      .addCase(getEncryptionRequestItem.rejected, (state, action) => {
        console.log(state, action.payload);
        state.isLoaded = true;
      })
  },
})

export const { setRequest } = encryptionRequestItemSlice.actions;

const encryptionRequestItemReducer = encryptionRequestItemSlice.reducer;

export default encryptionRequestItemReducer;
