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
app.use(corsMiddleware);
app.use(parserMiddleware);

// Models
const Artist = require('./Models/Artist');
const Comment = require('./Models/Comment');
const Record = require('./Models/Record');
const User = require('./Models/User');

// Routers
const authRouter = require('./auth/routerAuth');
const routerUser = require('./Routers/routerUser');
const routerArtist = require('./Routers/routerArtist');
const routerRecord = require('./Routers/routerRecord');
const routerComment = require('./Routers/routerComment');
app.use(authRouter, routerUser, routerRecord, routerArtist, routerComment);

// Create dummy password for test users
const bcrypt = require('bcrypt');
const createDummyPassword = () => {
  return bcrypt.hashSync('test123', 10);
};

// Sync Db and add dummy data
db.sync({ force: true })
  .then(() => console.log('Database successfully created'))
  .then(() =>
    User.bulkCreate([
      {
        username: 'testUser',
        email: 'testUser@email.com',
        password: createDummyPassword(),
      },
      {
        username: 'testUser1',
        email: 'testUser1@email.com',
        password: createDummyPassword(),
      },
      {
        username: 'testUser2',
        email: 'testUser2@email.com',
        password: createDummyPassword(),
      },
      {
        username: 'testUser3',
        email: 'testUser3@email.com',
        password: createDummyPassword(),
      },
    ])
  )
  .then(() =>
    Artist.bulkCreate([
      { name: 'Prince and the Revolution', img: 'https://bit.ly/3379DBr' },
      { name: 'Roy Ayers', img: 'https://bit.ly/2sb4KuF' },
    ])
  )
  .then(() =>
    Record.bulkCreate([
      {
        title: 'Purple Rain',
        description: 'LP limited edition',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://bit.ly/2OAxtQX',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Silver Vibrations ',
        description: 'LP first press',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://bit.ly/2OAxtQX',
        artistId: 2,
        userId: 2,
      },
    ])
  )
  .then(() =>
    Comment.bulkCreate([
      {
        text: 'Already exchanged with this user, good stuff',
        userId: 1,
        recordId: 2,
      },
      {
        text: 'Good copies from this user',
        userId: 2,
        recordId: 1,
      },
      {
        text: 'Does not look like the limited edition',
        userId: 3,
        recordId: 1,
      },
      {
        text: 'Year of release?',
        userId: 4,
        recordId: 1,
      },
    ])
  )
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
