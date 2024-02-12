import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { EncryptionUser } from '../../api';

export const usersList = createAsyncThunk<EncryptionUser[]>('/users/usersList', async () : Promise<any> => {
  // return api.api.apiEncryptionRequestsList().then(({data}) => data).catch(e => Error(e));
  return api.user.userList().then(({data}) => data).catch(e => Error(e));
});