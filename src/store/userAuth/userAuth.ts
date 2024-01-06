import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { EncryptionUser } from 'api';

export type TLoginData = {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk<EncryptionUser, TLoginData>('/login', async (loginData) : Promise<any> => {
  return api.api.apiLoginCreate(loginData).then(({data}) => data).catch(e => Error(e));
});

export const logoutUser = createAsyncThunk<EncryptionUser>('/logout', async () : Promise<any> => {
  return api.api.apiLogoutCreate().then(({data}) => data).catch(e => Error(e));
})