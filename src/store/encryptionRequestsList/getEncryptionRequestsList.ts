import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataEncryptionRequest } from '../../api';

export const getEncryptionRequestsList = createAsyncThunk<DataEncryptionRequest[]>('/encryption-requests/encryptionRequestsList', async () : Promise<any> => {
  return api.api.apiEncryptionRequestsList().then(({data}) => data).catch(e => Error(e));
});