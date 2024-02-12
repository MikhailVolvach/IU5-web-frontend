FROM node:18-alpine

WORKDIR /opt/project

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

#CMD ["yarn", "run", "dev", "--host"]
#COPY yarn.lock ./
#COPY node_modules ./node_modules
#RUN npm uninstall esbuild
#RUN rm -rf ./node_modules/@esbuild
#RUN npm i esbuild
#RUN npm i @esbuild/linux-x64
#RUN npm uninstall @esbuild/win32-x64
#RUN rm -rf ./node_modules/@esbuild/win32-x64
#RUN yarn add react@latest
#RUN yarn install
# COPY . ./


