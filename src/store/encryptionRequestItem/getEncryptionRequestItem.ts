import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataEncryptionRequest, DataItem } from 'api';

interface IReqItemData {
  request: DataEncryptionRequest;
  owner: string;
  data: DataItem[];
}

export const getEncryptionRequestItem = createAsyncThunk<IReqItemData, string>('/encryption-requests/getItem', async (id) : Promise<any> => {
  return api.api.apiEncryptionRequestsRead(id).then(({data}) => data).catch(e => Error(e));
});

export const addItemToRequest = createAsyncThunk<IReqItemData, string>('/encryption-requests/addDataItem', async (id) : Promise<any> => {
  return api.api.apiDataAddToRequestCreate(id).then(({data}) => data).catch(e => Error(e));
})

export const deleteItemFromRequest = createAsyncThunk<IReqItemData, string>('/encryption-requests/deleteDataItem', async (id) : Promise<any> => {
  return api.api.apiDataDeleteFromRequestDelete(id).then(({data}) => data).catch(e => Error(e));
})

export const formRequestItem = createAsyncThunk<DataEncryptionRequest>('/encryption-requests/form', async () : Promise<any> => {
  return api.api.apiEncryptionRequestsFormUpdate().then(({data}) => data).catch(e => Error(e));
})

export const deleteRequestItem = createAsyncThunk<DataEncryptionRequest, string>('/encryption-requests/delete', async (id) : Promise<any> => {
  return api.api.apiEncryptionRequestsDelete(id).then(({data}) => data).catch(e => Error(e));
});

type changeReqStatusInput = {
  id: string,
  status: string
}

export const changeReqStatus = createAsyncThunk<DataEncryptionRequest, changeReqStatusInput>('/encryption-requests/changeStatus', async (item) : Promise<any> => {
  return api.api.apiEncryptionRequestsChangeStatusUpdate(item.id, { status: item.status }).then(({data}) => data).catch(e => Error(e));
})
