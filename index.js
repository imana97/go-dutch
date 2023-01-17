// MONGO_URL:  mongodb://go-dutch-mongo-db:a0712d626479355487c95cda64177e4b@dokku-mongo-go-dutch-mongo-db:27017/go_dutch_mongo_db

const express = require('express');
// const ParseServer = require('parse-server').ParseServer;
const app = express();
const path = require('path');

// const server = new ParseServer({
//     databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
//     cloud: './cloud/main.js', // Path to your Cloud Code
//     appId: 'go-dutch',
//     masterKey: 'myMasterKey', // Keep this key secret!
//     fileKey: 'optionalFileKey',
//     serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
// });
//
// // Start server
// await server.start();



// Serve the Parse API on the /parse URL prefix
//app.use('/parse', server.app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req,res)=>{
    res.send('API works');
});

app.listen(3000, function() {
    console.log('parse-server-example running on port 443');
});