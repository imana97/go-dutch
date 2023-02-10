import { randomString } from './tools/common';

export const appConfig = {
  parse: {
    appId: 'go-dutch-app',
    serverURL: process.env.REACT_APP_PARSE_SERVER_URL || '',
  },
  splitwise: {
    host: 'https://secure.splitwise.com',
    clientId: process.env.REACT_APP_SPLITWISE_CONSUMER_KEY || '',
    redirectURI: process.env.REACT_APP_SPLITWISE_REDIRECT_URI || '',
    responseType: 'token', // try bearer
    scope: '',
    state: randomString(32),
  },
};
