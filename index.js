// Import DB
const db = require('./db');

// Express setup
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
const corsMiddleware = cors();
const bodyParser = require('body-parser');
const parserMiddleware = bodyParser.json();

// Use middleware
app.use(corsMiddleware);
app.use(parserMiddleware);

// Models
const Artist = require('./Models/Artist');
const Comments = require('./Models/Comment');
const Record = require('./Models/Record');
const User = require('./Models/User');

// Routers
const authRouter = require('./auth/routerAuth');
const routerUser = require('./Routers/routerUser');
const routerArtist = require('./Routers/routerArtist');
const routerRecord = require('./Routers/routerRecord');
const routerComments = require('./Routers/routerComment');

app.use(authRouter, routerUser, routerArtist, routerRecord, routerComments);

// Sync Db and create default data
db.sync({ force: false })
  .then(() => console.log('Database successfully created'))
  .catch((error) => {
    console.error('Unable to create tables', error);
    process.exit(1);
  });

// Port set-up
const port = process.env.PORT || 4000;

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(port, onListen);
