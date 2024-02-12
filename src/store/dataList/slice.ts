import { createSlice } from "@reduxjs/toolkit";
import { getListPageData, addDataItem } from "./getListPageData";
import { DataItemModel } from "store/models";
import { DataItemSerializer } from "store/serializers";

const dataListSlice = createSlice({
  name: 'dataList',
  initialState: {
    isLoaded: false,
    data: Array<DataItemModel>(),
    orderId: -1
  },
  reducers: {
    setIsLoaded(state, _action) {
      return { ...state, isLoaded: true };
    },
    setData(state, action) {
      return { ...state, data: action.payload };
    },
    setOrderId(state, action) {
      return { ...state, orderId: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListPageData.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getListPageData.fulfilled, (state, action) => {
        state.data = action.payload.data.map((item) => DataItemSerializer(item));
        state.orderId = action.payload.request_id;
        state.isLoaded = true;
      })
      .addCase(getListPageData.rejected, (state, action) => {
        console.log(state, action.payload);
        state.isLoaded = true;
      })
      .addCase(addDataItem.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(addDataItem.fulfilled, (state, action) => {
        state.data = action.payload.map((item) => DataItemSerializer(item));
        state.isLoaded = true;
      })
      .addCase(addDataItem.rejected, (state) => {
        state.isLoaded = true;
      })
  },
})

export const { setData, setOrderId, setIsLoaded } = dataListSlice.actions;

const dataListReducer = dataListSlice.reducer;

export default dataListReducer;
