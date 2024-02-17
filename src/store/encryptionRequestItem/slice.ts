import { createSlice } from "@reduxjs/toolkit";
import {DataItemModel, DataEncryptionRequestModel} from '../models';
import {
  getEncryptionRequestItem,
  addItemToRequest,
  deleteItemFromRequest,
  formRequestItem,
  deleteRequestItem,
  changeReqStatus
} from "./getEncryptionRequestItem";
import {DataItemSerializer, EncryptionRequestSerializer, getWorkStatus} from '../serializers';
import { EWorkStatus } from "store/enums";

interface IInitialState {
  isLoaded: boolean;
  request: DataEncryptionRequestModel;
  requestData: DataItemModel[];
  user: string;
  requestStatus: EWorkStatus | null;
}

const encryptionRequestItemSlice = createSlice({
  name: 'encryptionRequestItem',
  initialState: <IInitialState>{
    isLoaded: false,
    request: {} as DataEncryptionRequestModel,
    requestData: [] as DataItemModel[],
    user: '',
    requestStatus: null
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
        state.requestStatus = getWorkStatus(action.payload.request.work_status || EWorkStatus.DRAFT);
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
        state.requestStatus = getWorkStatus(action.payload.request.work_status || EWorkStatus.DRAFT);
      })
      .addCase(addItemToRequest.rejected, (state, _action) => {
        state.isLoaded = true;
      })

      .addCase(deleteItemFromRequest.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(deleteItemFromRequest.fulfilled, (state) => {
        state.request = {} as DataEncryptionRequestModel;
        state.requestData = [] as DataItemModel[];
        state.user = "";
        state.requestStatus = null;
        state.isLoaded = true;
      })
      .addCase(deleteItemFromRequest.rejected, (state) => {
        state.isLoaded = true;
      })

      .addCase(formRequestItem.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(formRequestItem.fulfilled, (state, action) => {
        state.request = EncryptionRequestSerializer(action.payload);
        state.isLoaded = true;
        state.requestStatus = getWorkStatus(action.payload.work_status || EWorkStatus.FORMED);
      })
      .addCase(formRequestItem.rejected, (state) => {
        state.isLoaded = true;
      })

      .addCase(deleteRequestItem.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(deleteRequestItem.fulfilled, (state) => {
        state.request = {} as DataEncryptionRequestModel;
        state.isLoaded = true;
        state.requestStatus = null;
      })
      .addCase(deleteRequestItem.rejected, (state) => {
        state.isLoaded = true;
      })
      .addCase(changeReqStatus.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(changeReqStatus.fulfilled, (state, action) => {
        state.request = EncryptionRequestSerializer(action.payload);
        state.isLoaded = true;
        state.requestStatus = getWorkStatus(action.payload.work_status || EWorkStatus.FORMED);
      })
      .addCase(changeReqStatus.rejected, (state) => {
        state.isLoaded = true;
      })
  },
})



export const { setRequest } = encryptionRequestItemSlice.actions;

const encryptionRequestItemReducer = encryptionRequestItemSlice.reducer;

export default encryptionRequestItemReducer;
