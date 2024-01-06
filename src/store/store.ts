import {configureStore, combineReducers} from "@reduxjs/toolkit";
import dataListReducer from './dataList';
import dataItemReducer from './dataItem';
import encryptionRequestsListReducer from './encryptionRequestsList';
import encryptionRequestsItemReducer from './encryptionRequestItem';
import userReducer from './userAuth';

const store = configureStore({
  reducer: combineReducers({
    dataList: dataListReducer,
    dataItem: dataItemReducer,
    encryptionRequestsList: encryptionRequestsListReducer,
    encryptionRequestItem: encryptionRequestsItemReducer,
    userAuth: userReducer
  })
})

export default store;