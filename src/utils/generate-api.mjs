import { resolve } from 'path';

import { generateApi } from 'swagger-typescript-api';

generateApi({
  name: 'Api.ts',
  input: resolve(process.cwd(), './src/utils/swagger.json'),
  output: resolve(process.cwd(), './src/api'),
  httpClientType: 'axios', 
});