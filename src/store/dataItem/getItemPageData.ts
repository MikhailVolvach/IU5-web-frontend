import { createAsyncThunk } from "@reduxjs/toolkit";

import api, { DataItem } from '../../api';
import {DataItemModel} from "store/models.ts";
import axios from "axios";

export const getItemPageData = createAsyncThunk<DataItem, string>('data/dataItem', async (id) : Promise<any> => {
  return api.api.apiDataRead(id).then(({data}) => data).catch(e => Error(e));
});

export const changeDataItem = createAsyncThunk<DataItem, { id: number, itemData: DataItemModel }>('data/changeDataItem', async (item) : Promise<any> => {
  const formData = new FormData();
  formData.append('id', `${item.itemData.id}`);
  formData.append('title', item.itemData.title);
  formData.append('data_type', `${item.itemData.dataType}`);
  formData.append('is_encrypted', `${item.itemData.isEncrypted}`);
  formData.append('is_deleted', `${item.itemData.isDeleted}`);

  if (typeof item.itemData.img === 'string') {
    axios.get(item.itemData.img, { responseType: 'blob' })
      .then(response => {
        const file = new File([response.data], `${item.itemData.title}.jpg`, { type: response.headers['content-type'] });
        formData.append('img', file);
      })
      .catch(error => {
        console.error('Ошибка при загрузке изображения:', error);
      });
  } else {
    // @ts-ignore
    formData.append('img', item.itemData.img);
  }

  if (typeof item.itemData.file === 'string') {
    axios.get(item.itemData.file, { responseType: 'blob' })
      .then(response => {
        const file = new File([response.data], `${item.itemData.title}.txt`, { type: response.headers['content-type'] });
        formData.append('file', file);
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });
  } else {
    // @ts-ignore
    formData.append('file', item.itemData.file);
  }
  // @ts-ignore
  return api.api.apiDataUpdate(`${item.id}`, formData).then(({data}) => data).catch(e => Error(e));
});

export const deleteDataItem = createAsyncThunk<DataItem, number>('data/deleteDataItem', async (id) : Promise<any> => {
  return api.api.apiDataDelete(`${id}`).then(({data}) => data).catch(e => Error(e));
});