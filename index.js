const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const path = require('path');
const ParseDashboard = require('parse-dashboard');
const parseServerConfig = require('./config/parse-server-config');
const parseDashboardConfig = require('./config/parse-dashboard-config');

const api = new ParseServer(parseServerConfig);
const dashboard = new ParseDashboard(parseDashboardConfig, {
  allowInsecureHTTP: false,
});

// static files
app.use(express.static(path.join(__dirname, 'ui/build')));
// parse server
app.use('/parse', api);
// parse dashboard
app.use('/dashboard', dashboard);

app.listen(process.env['EXPRESS_PORT'], function () {
  console.log(
    'parse-server-example running on port ' + process.env['EXPRESS_PORT'],
  );
});
