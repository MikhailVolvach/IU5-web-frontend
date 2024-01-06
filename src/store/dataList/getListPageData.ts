import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataItem } from '../../api';

export const getListPageData = createAsyncThunk<{ data: DataItem[]; request_id: number }, string>('data/dataList', async (search) : Promise<any> => {
  return api.api.apiDataList({ search }).then(({data}) => data).catch(e => Error(e));
})