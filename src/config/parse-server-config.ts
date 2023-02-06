import emailAdapter from './parse-email-adapter-config';
import path from 'path';

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
};
