import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {dataListReducer} from './dataList';

export const store = configureStore({
  reducer: combineReducers({
    dataList: dataListReducer,
  })
})