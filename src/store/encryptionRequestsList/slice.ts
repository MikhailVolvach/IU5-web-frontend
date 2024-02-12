import { createSlice } from "@reduxjs/toolkit";
import { getEncryptionRequestsList } from "./getEncryptionRequestsList";
import { DataEncryptionRequestModel } from "store/models";
import { EncryptionRequestSerializer } from "store/serializers";

const encryptionRequestsListSlice = createSlice({
  name: 'encryptionRequestsList',
  initialState: {
    isLoaded: false,
    requests: Array<DataEncryptionRequestModel>(),
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
        state.requests = action.payload.map((item) => EncryptionRequestSerializer(item));
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
