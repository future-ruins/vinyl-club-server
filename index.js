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
// Force true for testing purposes
db.sync({ force: true })
  .then(() => console.log('Database successfully created'))
  .then(() =>
    User.bulkCreate([
      {
        username: 'Joris',
        email: 'testUser@email.com',
        password: createDummyPassword(),
      },
      {
        username: 'Ivana',
        email: 'testUser1@email.com',
        password: createDummyPassword(),
      },
      {
        username: 'Moses',
        email: 'testUser2@email.com',
        password: createDummyPassword(),
      },
      {
        username: 'Ramses',
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
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/tna88hn',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Silver Vibrations ',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/t3eruvg',
        artistId: 2,
        userId: 2,
      },
      {
        title: 'Funky stuff',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/w7dk644',
        artistId: 2,
        userId: 3,
      },
      {
        title: 'Disco stuff',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/td56za5',
        artistId: 1,
        userId: 4,
      },
      {
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/tna88hn',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Dolor sit amet',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/r9ewhor',
        artistId: 2,
        userId: 2,
      },
      {
        title: 'Consectetur adipiscing',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/r9ewhor',
        artistId: 2,
        userId: 2,
      },
      {
        title: 'Donec placerat',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/td56za5',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Purple Rain',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/tna88hn',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Silver Vibrations ',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/t3eruvg',
        artistId: 2,
        userId: 2,
      },
      {
        title: 'Funky stuff',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/td56za5',
        artistId: 2,
        userId: 2,
      },
      {
        title: 'Disco stuff',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/tna88hn',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Consectetur adipiscing',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/r9ewhor',
        artistId: 2,
        userId: 2,
      },
      {
        title: 'Donec placerat',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/td56za5',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Purple Rain',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/tna88hn',
        artistId: 1,
        userId: 1,
      },
      {
        title: 'Silver Vibrations ',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat eu lectus nec facilisis.',
        format: 12,
        genre: 'Funk, Soul',
        img: 'https://tinyurl.com/t3eruvg',
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
