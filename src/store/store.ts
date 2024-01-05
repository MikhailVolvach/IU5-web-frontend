import {configureStore, combineReducers} from "@reduxjs/toolkit";
import dataListReducer from './dataList';
import dataItemReducer from './dataItem';

const store = configureStore({
  reducer: combineReducers({
    dataList: dataListReducer,
    dataItem: dataItemReducer,
  })
})

export default store;