const { Router } = require('express');
const router = new Router();
const Record = require('../Models/Record');
const Artist = require('../Models/Artist');
const auth = require('../auth/authMiddleware');
const { toData } = require('../auth/jwt');

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

// Anyone can view all Records for a given artist
router.get('/artist/:id/records', (request, response, next) => {
  Artist.findByPk(parseInt(request.params.id)).then(() => {
    const artistId = request.params.id;
    Record.findAll({ where: { artistId }, order: [['createdAt', 'DESC']] })
      .then((records) => {
        if (records.length === 0) {
          return response
            .status(404)
            .send({ message: 'No Records for this artist' });
        } else {
          return response.send(records);
        }
      })
      .catch((error) => next(error));
  });
});

// Anyone can view all Records (10 per page)
router.get('/records/page/:num', (request, response, next) => {
  const page = parseInt(request.params.num);
  const limit = 10;
  let offset = 0;
  if (page >= 1) {
    offset = page * limit;
  }
  Record.findAndCountAll({ offset, limit, order: [['createdAt', 'DESC']] })
    .then((result) => {
      const pages = Math.ceil(result.count / limit);
      response.status(200).send({ ...result, pages });
    })
    .catch(next);
});

// Logged-in user can post a Record
router.post('/artist/:id/record', auth, (request, response, next) => {
  const auth =
    request.headers.authorization && request.headers.authorization.split(' ');
  const loggedInUserId = toData(auth[1]).userId;
  const newRecord = {
    title: request.body.title,
    description: request.body.description,
    format: request.body.format,
    genre: request.body.genre,
    img: request.body.img,
    artistId: parseInt(request.params.id),
    userId: loggedInUserId,
  };

  Record.create(newRecord)
    .then((result) => {
      //console.log('result', result.dataValues);
      return response.status(201).send(result);
    })
    .catch((error) => next(error));
});

// Logged-in user can edit a Record he/she posted
router.put('/record/:id', auth, (request, response, next) => {
  const { title, description, format, genre, img } = request.body;
  Record.findByPk(parseInt(request.params.id))
    .then((record) => {
      const auth =
        request.headers.authorization &&
        request.headers.authorization.split(' ');
      const loggedInUserId = toData(auth[1]).userId;

      if (record.userId === loggedInUserId) {
        return Record.update(
          {
            title: title,
            description: description,
            format: format,
            genre: genre,
            img: img,
          },
          {
            where: {
              id: request.params.id,
            },
          }
        ).then((record) => {
          return response.status(201).send(record);
        });
      } else if (record.userId !== loggedInUserId) {
        return response.status(401).end();
      } else if (!record) {
        return response.status(404).send({ message: 'Record not found' });
      }
    })
    .catch((error) => next(error));
});

// Logged-in user can delete a Record he/she posted
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
