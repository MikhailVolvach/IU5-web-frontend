import { createSlice } from "@reduxjs/toolkit";
import { getEncryptionRequestsList } from "./getEncryptionRequestsList";
import { DataEncryptionRequestModel } from "store/models";
import { EncryptionRequestSerializer } from "store/serializers";

const encryptionRequestsListSlice = createSlice({
  name: 'encryptionRequestsList',
  initialState: {
    isLoaded: false,
    requests: Array<DataEncryptionRequestModel>(),
    dateStart: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    dateEnd: new Date().toISOString()
  },
  reducers: {
    setIsLoaded(state, _action) {
      return { ...state, isLoaded: true };
    },
    setRequests(state, action) {
      return { ...state, requests: action.payload };
    },
    setDateStart(state, action) {
      return { ...state, dateStart: action.payload };
    },
    setDateEnd(state, action) {
      return { ...state, dateEnd: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEncryptionRequestsList.fulfilled, (state, action) => {
        state.isLoaded = false;
        // @ts-ignore
        state.requests = action.payload.map((item) => EncryptionRequestSerializer(item)).sort((a, b) => a.id - b.id);
        state.isLoaded = true;
      })
      .addCase(getEncryptionRequestsList.rejected, (state, action) => {
        console.log(state, action.payload);
      })
  },
})

export const { setRequests, setDateStart, setDateEnd } = encryptionRequestsListSlice.actions;

const encryptionRequestsListReducer = encryptionRequestsListSlice.reducer;

export default encryptionRequestsListReducer;
