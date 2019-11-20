const { Router } = require('express');
const { toJWT } = require('./jwt');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const router = new Router();

// Login endpoint
router.post('/login', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  if (!email || !password) {
    response.status(400).send({
      message: 'Please supply a valid email and password',
    });
  } else {
    // 1. finds user based on email address
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((entity) => {
        if (!entity) {
          response.status(400).send({
            message: 'User with that email address does not exist',
          });
        }
        // 2. Uses bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(request.body.password, entity.password)) {
          // 3. If the password is correct, returns a JWT with the userId of the user
          response.send({
            jwt: toJWT({ userId: entity.id }),
            username: entity.username,
          });
        } else {
          response.status(400).send({
            message: 'Password was incorrect',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({
          message: 'Something went wrong',
        });
      });
  }
});

module.exports = router;
