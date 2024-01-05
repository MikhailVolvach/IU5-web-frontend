import { createSlice } from "@reduxjs/toolkit";
import { DataItem } from "api";
import { getListPageData } from "./getListPageData";

const dataListSlice = createSlice({
  name: 'dataList',
  initialState: {
    isLoaded: false,
    data: Array<DataItem>(),
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
      .addCase(getListPageData.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.data = action.payload?.data;
        state.orderId = action.payload?.request_id;
        state.isLoaded = true;
      })
      .addCase(getListPageData.rejected, (state, action) => {
        console.log(state, action.payload);
      })
  },
})

export const { setData, setOrderId } = dataListSlice.actions;

const dataListReducer = dataListSlice.reducer;

export default dataListReducer;
