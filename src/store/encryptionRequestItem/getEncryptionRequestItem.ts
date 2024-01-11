import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataEncryptionRequest, DataItem } from 'api';

interface IReqItemData {
  request: DataEncryptionRequest;
  owner: string;
  data: DataItem[];
}

export const getEncryptionRequestItem = createAsyncThunk<IReqItemData, string>('/encryption-requests/encryptionRequestItem', async (id) : Promise<any> => {
  return api.api.apiEncryptionRequestsRead(id).then(({data}) => data).catch(e => Error(e));
});

export const addItemToRequest = createAsyncThunk<IReqItemData, string>('/encryption-requests/addDataItemToRequest', async (id) : Promise<any> => {
  return api.api.apiDataAddToRequestCreate(id).then(({data}) => data).catch(e => Error(e));
})