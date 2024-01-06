import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataEncryptionRequest } from '../../api';

export const getEncryptionRequestsList = createAsyncThunk<DataEncryptionRequest[]>('/encryption-requests/encryptionRequestsList', async () : Promise<any> => {
  return api.encryptionRequests.encryptionRequestsList().then(({data}) => data).catch(e => Error(e));
});