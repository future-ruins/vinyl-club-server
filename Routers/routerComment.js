const { Router } = require('express');
const router = new Router();
const Record = require('../Models/Record');
const Comment = require('../Models/Comment');
const auth = require('../auth/authMiddleware');
const { toData } = require('../auth/jwt');

// Logged-in user can post a comment on a Record resource
router.post('/record/:id/comment', auth, (request, response, next) => {
  const auth =
    request.headers.authorization && request.headers.authorization.split(' ');
  const loggedInUserId = toData(auth[1]).userId;

  Record.findByPk(parseInt(request.params.id))
    .then((record) => {
      if (!record) {
        return response.status(404).send({ message: 'Record not found' });
      } else {
        const newCommentForRecord = {
          text: request.body.text,
          recordId: request.params.id,
          userId: loggedInUserId,
        };
        Comment.create(newCommentForRecord).then((result) => {
          //console.log('result', result.dataValues);
          return response.status(201).send(result.text);
        });
      }
    })
    .catch((error) => next(error));
});

// Anyone can view all comments for a Record resource
router.get('/record/:id/comments', (request, response, next) => {
  Record.findByPk(parseInt(request.params.id))
    .then((record) => {
      if (!record) {
        return response.status(404).send({ message: 'Record not found' });
      } else {
        const recordId = request.params.id;
        Comment.findAll({ where: { recordId } }).then((result) => {
          return response.send(result);
        });
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
