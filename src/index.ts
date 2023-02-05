const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
import path from 'path';

const ParseDashboard = require('parse-dashboard');
const parseServerConfig = require('./config/parse-server-config');
const parseDashboardConfig = require('./config/parse-dashboard-config');
import { createServer } from 'http';

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

// app.listen(process.env["EXPRESS_PORT"], function() {
//   console.log(
//     process.env["PARSE_APP_NAME"] +
//     " API is running on port " +
//     process.env["EXPRESS_PORT"]
//   );
// });

const httpServer = createServer(app);
httpServer.listen(process.env['EXPRESS_PORT'], () => {
  console.log(
    process.env['PARSE_APP_NAME'] +
      ' API is running on port ' +
      process.env['EXPRESS_PORT'],
  );
});

ParseServer.createLiveQueryServer(httpServer);
