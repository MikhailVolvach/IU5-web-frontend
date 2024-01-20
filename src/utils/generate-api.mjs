import { resolve } from 'path';

import { generateApi } from 'swagger-typescript-api';

const inputPath = resolve(process.cwd(), './swagger.json');
console.log('Resolved input path:', inputPath);

generateApi({
  name: 'Api.ts',
  input: resolve(process.cwd(), './src/utils/swagger.json'),
  output: resolve(process.cwd(), './src/api'),
  httpClientType: 'axios', 
});