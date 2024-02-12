import {configureStore, combineReducers} from "@reduxjs/toolkit";
import dataListReducer from './dataList';
import dataItemReducer from './dataItem';
import encryptionRequestsListReducer from './encryptionRequestsList';
import encryptionRequestsItemReducer from './encryptionRequestItem';
import userReducer from './userAuth';
import usersListReducer from "./usersList";

const store = configureStore({
  reducer: combineReducers({
    dataList: dataListReducer,
    dataItem: dataItemReducer,
    encryptionRequestsList: encryptionRequestsListReducer,
    encryptionRequestItem: encryptionRequestsItemReducer,
    userAuth: userReducer,
    usersList: usersListReducer
  })
})

export default store;