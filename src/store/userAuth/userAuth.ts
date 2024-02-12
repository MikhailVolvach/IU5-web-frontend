import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { EncryptionUser } from 'api';


type TUserReqData = {
  user: EncryptionUser;
  order_id: string;
}


export const loginUser = createAsyncThunk<TUserReqData, {username: string, password: string}>('/login', async (username, password) : Promise<any> => {
  return api.api.apiLoginCreate(username, password).then(({data}) => data).catch(e => Error(e));
});

export const logoutUser = createAsyncThunk('/logout', async () : Promise<any> => {
  return api.api.apiLogoutCreate().then(({data}) => data).catch(e => Error(e));
})

export const authUser = createAsyncThunk<TUserReqData>('userAuth', async () : Promise<any> => {
  return api.api.apiUserAuthList().then(({data}) => data).catch(e => Error(e));
})