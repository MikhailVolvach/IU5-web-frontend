import { createSlice } from "@reduxjs/toolkit";
import { DataItem } from "api";

const dataListSlice = createSlice({
  name: 'dataList',
  initialState: {
    data: Array<DataItem>(),
    orderId: null
  },
  reducers: {
    setData(state, {payload}) {
      state.data = payload.data;
      state.orderId = payload.orderId;
    }
  }
})

export const { actions: dataListActions, reducer: dataListReducer } = dataListSlice
