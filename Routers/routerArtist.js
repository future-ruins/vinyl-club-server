const { Router } = require('express');
const router = new Router();
const Artist = require('../Models/Artist');
const auth = require('../auth/authMiddleware');

router.post('/artist', auth, (request, response, next) => {
  const newArtist = {
    name: request.body.name,
    img: request.body.img,
  };
  Artist.create(newArtist)
    .then((artist) => response.send(artist))
    .catch(next);
});

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

router.get('/artists', (request, response, next) => {
  Artist.findAll()
    .then((artists) => {
      return response.send(artists);
    })
    .catch((error) => next(error));
});

module.exports = router;
