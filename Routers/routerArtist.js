const { Router } = require('express');
const router = new Router();
const Artist = require('../Models/Artist');

// Anyone can read a single Artist resource
router.get('/artist/:id', (request, response, next) => {
  Artist.findByPk(parseInt(request.params.id))
    .then((artist) => {
      if (!artist) {
        return response.status(404).send({ message: 'Artist not found' });
      } else {
        return response.send(artist);
      }
    })
    .catch((error) => next(error));
});

// Get all Artists
router.get('/artists', (request, response, next) => {
  Artist.findAll()
    .then((response) => {
      if (!artists) {
        return response.status(404).send({ message: 'Artists not found' });
      } else {
        return response.send(artists);
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
