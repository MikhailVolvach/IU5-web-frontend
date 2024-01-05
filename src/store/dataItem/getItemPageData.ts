import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataItem } from '../../api';

export const getItemPageData = createAsyncThunk<DataItem, string>('data/dataItem', async (id) : Promise<any> => {
  return api.data.dataRead(id).then(({data}) => data).catch(e => Error(e));
})