const emailAdapter = require('./parse-email-adapter-config');

module.exports = {
  appName: process.env['PARSE_APP_NAME'],
  databaseURI: process.env['MONGO_URL'],
  cloud: './cloud/main.js',
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
};
