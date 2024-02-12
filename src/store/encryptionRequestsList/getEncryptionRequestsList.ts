import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataEncryptionRequest } from '../../api';

type DateInterval = {
  start: Date,
  end: Date
}

export const getEncryptionRequestsList = createAsyncThunk<DataEncryptionRequest[], DateInterval>('/encryption-requests/encryptionRequestsList', async ({start, end }) : Promise<any> => {
  return api.api.apiEncryptionRequestsList({ start_date: start.toISOString(), end_date: end.toISOString() }).then(({data}) => data).catch(e => Error(e));
});
