import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataItem } from '../../api';
import { DataItemModel } from "store/models.ts";

export const getListPageData = createAsyncThunk<{ data: DataItem[]; request_id: number }, string | undefined>('data/dataList', async (search = "") : Promise<any> => {
  return api.api.apiDataList({ search }).then(({data}) => data).catch(e => Error(e));
})

export const addDataItem = createAsyncThunk<DataItem[], DataItemModel>('data/add', async (dataItem) : Promise<any> => {
  return api.api.apiDataCreate(dataItem).then(({data}) => data).catch(e => Error(e));
});