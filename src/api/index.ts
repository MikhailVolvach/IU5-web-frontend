// import {Api} from './Api';
import { Api } from './Api.ts';
export type { DataItem, EncryptionUser, DataEncryptionRequest, QueryParamsType } from './Api.ts';

// const api = new Api({ baseURL: 'http://localhost:8000/' });
const api = new Api({ baseURL: 'http://localhost:8000' });
// const api  = new Api({baseURL: 'https://petstore3.swagger.io/api/v3'});

export default api;
