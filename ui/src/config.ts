import { randomString } from './tools/common';

export const appConfig = {
  parse: {
    appId: 'go-dutch-app',
    serverURL: 'https://godutch.us/parse',
    //serverURL: 'http://localhost:3001/parse',
  },
  splitwise: {
    host: 'https://secure.splitwise.com',
    clientId: 'Gtoa6OVYC2MuX3w7l86EEvwdsDkIxxGsFFNhGksh',
    redirectURI: 'http://localhost:3000/#login',
    responseType: 'token', // try bearer
    scope: '',
    state: randomString(32),
  },
};
