import { createSlice } from "@reduxjs/toolkit";
import {DataEncryptionRequest} from "../../api";
import { getEncryptionRequestsList } from "./getEncryptionRequestsList";

const encryptionRequestsListSlice = createSlice({
  name: 'encryptionRequestsList',
  initialState: {
    isLoaded: false,
    requests: Array<DataEncryptionRequest>(),
  },
  reducers: {
    setIsLoaded(state, _action) {
      return { ...state, isLoaded: true };
    },
    setRequests(state, action) {
      return { ...state, requests: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEncryptionRequestsList.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.requests = action.payload;
        state.isLoaded = true;
      })
      .addCase(getEncryptionRequestsList.rejected, (state, action) => {
        console.log(state, action.payload);
      })
  },
})

export const { setRequests } = encryptionRequestsListSlice.actions;

const encryptionRequestsListReducer = encryptionRequestsListSlice.reducer;

export default encryptionRequestsListReducer;
