import {Api} from './Api';
export type { DataItem, EncryptionUser, DataEncryptionRequest, QueryParamsType } from './Api';

const api = new Api({ baseURL: 'http://127.0.0.1:8000/' });
// const api  = new Api({baseURL: 'https://petstore3.swagger.io/api/v3'});

export default api;
