import { createSlice } from "@reduxjs/toolkit";
import {DataItemModel, DataEncryptionRequestModel} from '../models';
import { getEncryptionRequestItem, addItemToRequest } from "./getEncryptionRequestItem";
import {DataItemSerializer, EncryptionRequestSerializer} from '../serializers';

const encryptionRequestItemSlice = createSlice({
  name: 'encryptionRequestItem',
  initialState: {
    isLoaded: false,
    request: {} as DataEncryptionRequestModel,
    requestData: [] as DataItemModel[],
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
        state.request = EncryptionRequestSerializer(action.payload.request);
        state.requestData = action.payload.data.map((dataItem) => DataItemSerializer(dataItem));
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
        state.request = EncryptionRequestSerializer(action.payload.request);
        state.requestData = action.payload.data.map((dataItem) => DataItemSerializer(dataItem));
        state.user = action.payload.owner;
        state.isLoaded = true;
      })
      .addCase(addItemToRequest.rejected, (state, _action) => {
        state.isLoaded = true;
      })
  },
})



export const { setRequest } = encryptionRequestItemSlice.actions;

const encryptionRequestItemReducer = encryptionRequestItemSlice.reducer;

export default encryptionRequestItemReducer;
