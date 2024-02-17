import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataEncryptionRequest } from '../../api';

type DateInterval = {
  start: string,
  end: string
}

export const getEncryptionRequestsList = createAsyncThunk<DataEncryptionRequest[], DateInterval>('/encryption-requests/encryptionRequestsList', async ({start, end }) : Promise<any> => {
  return api.api.apiEncryptionRequestsList({ start_date: start, end_date: end }).then(({data}) => data).catch(e => Error(e));
});
