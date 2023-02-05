export default {
  apps: [
    {
      serverURL: process.env['PARSE_SERVER_URL'],
      appId: process.env['PARSE_APP_ID'],
      masterKey: process.env['PARSE_MASTER_KEY'],
      appName: process.env['PARSE_APP_NAME'],
    },
  ],
  trustProxy: 1,
  users: [
    {
      user: process.env['PARSE_DASHBOARD_USERNAME'],
      pass: process.env['PARSE_DASHBOARD_PASSWORD'],
    },
  ],
  useEncryptedPasswords: false,
};
