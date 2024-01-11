import { createSlice } from "@reduxjs/toolkit";
import { DataEncryptionRequest, DataItem,  } from "../../api";
import { getEncryptionRequestItem, addItemToRequest } from "./getEncryptionRequestItem";

const encryptionRequestItemSlice = createSlice({
  name: 'encryptionRequestItem',
  initialState: {
    isLoaded: false,
    request: {} as DataEncryptionRequest,
    requestData: [] as DataItem[],
    user: ''
  },
  reducers: {
    setIsLoaded(state, _action) {
      return { ...state, isLoaded: true };
    },
    setRequest(state, action) {
      return { ...state, request: action.payload };
    },
    setRequestData(state, action) {
      return { ...state, requestData: action.payload };
    },
    setUser(state, action) {
      return { ...state, user: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEncryptionRequestItem.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getEncryptionRequestItem.fulfilled, (state, action) => {
        state.request = action.payload.request;
        state.requestData = action.payload.data;
        state.user = action.payload.owner;
        state.isLoaded = true;
      })
      .addCase(getEncryptionRequestItem.rejected, (state, action) => {
        console.log(state, action.payload);
        state.isLoaded = true;
      })
      .addCase(addItemToRequest.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(addItemToRequest.fulfilled, (state, action) => {
        state.request = action.payload.request;
        state.requestData = action.payload.data;
        state.user = action.payload.owner;
        state.isLoaded = true;
      })
      .addCase(addItemToRequest.rejected, (state, action) => {
        console.log(state, action.payload);
        state.isLoaded = true;
      })
  },
})

export const { setRequest } = encryptionRequestItemSlice.actions;

const encryptionRequestItemReducer = encryptionRequestItemSlice.reducer;

export default encryptionRequestItemReducer;
