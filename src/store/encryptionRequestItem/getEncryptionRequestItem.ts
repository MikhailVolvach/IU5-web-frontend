import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataEncryptionRequest } from '../../api';

export const getEncryptionRequestItem = createAsyncThunk<DataEncryptionRequest[], string>('/encryption-requests/encryptionRequestItem', async (id) : Promise<any> => {
  return api.api.apiEncryptionRequestsRead(id).then(({data}) => data).catch(e => Error(e));
});