import {configureStore, combineReducers} from "@reduxjs/toolkit";
import dataListReducer from './dataList';
import dataItemReducer from './dataItem';
import encryptionRequestsListReducer from './encryptionRequestsList';

const store = configureStore({
  reducer: combineReducers({
    dataList: dataListReducer,
    dataItem: dataItemReducer,
    encryptionRequestsList: encryptionRequestsListReducer,
    encryptionRequestItem: encryptionRequestsListReducer
  })
})

export default store;