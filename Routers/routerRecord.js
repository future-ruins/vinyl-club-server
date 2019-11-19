const { Router } = require('express');
const router = new Router();
const Record = require('../Models/Record');
const Artist = require('../Models/Artist');
const auth = require('../auth/authMiddleware');
const { toData } = require('../auth/jwt');

// Logged in user can post a Record (auth)
router.post('/artist/:id/records', auth, (request, response, next) => {
  const auth =
    request.headers.authorization && request.headers.authorization.split(' ');
  // Convert token to readable data and store only the userId
  const loggedInUserId = toData(auth[1]).userId;

  Artist.findByPk(parseInt(request.params.id))
    .then((artist) => {
      if (!artist) {
        return response.status(404).send({ message: 'Artist not found' });
      } else {
        const newRecordForArtist = {
          title: request.body.title,
          description: request.body.description,
          format: request.body.format,
          genre: request.body.genre,
          img: request.body.img,
          artistId: request.params.id,
          userId: loggedInUserId,
        };
        Record.create(newRecordForArtist).then((result) => {
          //console.log('result', result.dataValues);
          return response.status(201).send(result);
        });
      }
    })
    .catch((error) => next(error));
});

// Anyone can read a single Record resource
router.get('/record/:id', (request, response, next) => {
  Record.findByPk(parseInt(request.params.id))
    .then((record) => {
      if (!record) {
        return response.status(404).send({ message: 'Record not found' });
      } else {
        return response.send(record);
      }
    })
    .catch((error) => next(error));
});

// Anyone can see all Records for a specific artist
router.get('/artist/:id/records', (request, response, next) => {
  Artist.findByPk(parseInt(request.params.id)).then(() => {
    const artistId = request.params.id;
    // Show latest added Records first
    Record.findAll({ where: { artistId }, order: [['createdAt', 'DESC']] })
      .then((records) => {
        if (records.length === 0) {
          return response
            .status(204)
            .send({ message: 'No Records for this artist' });
        } else {
          return response.send(records);
        }
      })
      .catch((error) => next(error));
  });
});

// Logged in user can edit a Record he/she posted (auth)

router.put('/record/:id', auth, (request, response) => {
  Record.findByPk(parseInt(request.params.id))
    .then((record) => {
      // Split auth type and token from header
      const auth =
        request.headers.authorization &&
        request.headers.authorization.split(' ');
      // Convert token to readable data and store only the userId
      const loggedInUserId = toData(auth[1]).userId;
      if (record.userId === loggedInUserId) {
        return Record.update(request.body).then((record) => {
          return response.json(record);
        });
      } else if (record.userId !== loggedInUserId) {
        return response.status(401).end();
      } else if (!record) {
        return response.status(404).send({ message: 'Record not found' });
      }
    })
    .catch((error) => {
      if (error.name === 'SequelizeValidationError') {
        return response.status(422).send({ message: 'Not all data provided' });
      } else {
        return response.status(400).end();
      }
    });
});

// Logged in user can delete a Record he/she posted (auth, identify the user)

router.delete('/record/:id', auth, (request, response) => {
  Record.findByPk(parseInt(request.params.id))
    .then((record) => {
      const auth =
        request.headers.authorization &&
        request.headers.authorization.split(' ');
      const loggedInUserId = toData(auth[1]).userId;

      if (record.userId === loggedInUserId) {
        record
          .destroy({
            where: {
              id: request.params.id,
            },
          })
          .then((deletedItems) => {
            if (deletedItems === 0) {
              response.status(404).end();
            } else {
              response.send({ message: 'Record successfully deleted' });
            }
          });
      } else if (record.userId !== loggedInUserId) {
        return response.status(401).end();
      } else if (!record) {
        return response.status(404).send({ message: 'Record not found' });
      }
    })
    .catch((error) => {
      return response.status(400).end();
    });
});

module.exports = router;
