const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const path = require('path');
const ParseDashboard = require('parse-dashboard');

const APP_ID = 'go-dutch-app';


const api = new ParseServer({
    databaseURI: process.env['MONGO_URL'],
    cloud: './cloud/main.js',
    appId: APP_ID,
    allowClientClassCreation: false,
    enforcePrivateUsers: true,
    directAccess: true,
    masterKey: process.env['PARSE_MASTER_KEY'],
    fileKey: process.env['PARSE_FILE_KEY'],
    serverURL: process.env['PARSE_SERVER_URL']
});


const dashboard = new ParseDashboard({
    "apps": [{
        "serverURL": process.env['PARSE_SERVER_URL'],
        "appId": APP_ID,
        "masterKey": process.env['PARSE_MASTER_KEY'],
        "appName": "Go Dutch"
    }],
    "trustProxy": 1,
    "users": [{"user": "admin", "pass": process.env['PARSE_DASHBOARD_PASSWORD']}
    ],
    "useEncryptedPasswords": false
}, {allowInsecureHTTP: false});


// static files
app.use(express.static(path.join(__dirname, 'ui/build')));
// parse server
app.use('/parse', api);
// parse dashboard
app.use('/dashboard', dashboard);

app.listen(process.env['EXPRESS_PORT'], function () {
    console.log('parse-server-example running on port ' + process.env['EXPRESS_PORT']);
});