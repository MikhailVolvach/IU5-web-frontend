import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataItem } from '../../api';

export const getListPageData = createAsyncThunk<DataItem[], string>('data/dataList', async (search) : Promise<any> => {
  // console.log(await api.data.dataList({ search }).then(({data}) => data).catch(e => Error(e)));
  return api.data.dataList({ search }).then(({data}) => data).catch(e => Error(e));
})