import emailAdapter from './parse-email-adapter-config';
import path from 'path';
import { getCurrentUser } from '../service/splitwise/api';

const cloudCodeExtensionResolver = () => {
  return path.extname(path.basename(__filename));
};

export default {
  appName: process.env['PARSE_APP_NAME'],
  databaseURI: process.env['MONGO_URL'],
  cloud: path.join(__dirname, '../cloud/main' + cloudCodeExtensionResolver()),
  appId: process.env['PARSE_APP_ID'],
  allowClientClassCreation: false,
  enforcePrivateUsers: true,
  directAccess: true,
  masterKey: process.env['PARSE_MASTER_KEY'],
  fileKey: process.env['PARSE_FILE_KEY'],
  serverURL: process.env['PARSE_SERVER_URL'],
  publicServerURL: process.env['PARSE_SERVER_URL'],
  verifyUserEmails: true,
  emailAdapter,
  liveQuery: {
    classNames: ['Event', 'EventGroup', 'EventGroupBalance'],
  },
  auth: {
    splitwise: {
      validateAuthData: async (authData: {
        id: string;
        access_token: string;
      }) => {
        try {
          const user = JSON.parse(
            await getCurrentUser(authData['access_token']),
          );
          if (user.user?.id && authData.id && user.user.id === authData.id) {
            // auth data is valid;
            return true;
          } else {
            throw new Error('OAuth2 access token is invalid for this user.');
          }
        } catch (error) {
          throw error;
        }
      },
      validateAppId: async (
        appIds: any,
        authData: { id: string; access_token: string },
      ) => {
        try {
          const user = JSON.parse(
            await getCurrentUser(authData['access_token']),
          );
          if (user.user?.id && authData.id && user.user.id === appIds) {
            return true;
          } else {
            throw new Error('User is not valid');
          }
        } catch (error) {
          throw error;
        }
      },
    },
  },
};
