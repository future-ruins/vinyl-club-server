const Sequelize = require('sequelize');
const { Router } = require('express');
const User = require('../Models/User');
const router = new Router();
const bcrypt = require('bcrypt');

// User can sign-up
router.post('/user', (request, response) => {
  const { email, password, username } = request.body;
  // Checks if all data is provided
  if (email && password && username) {
    const user = {
      email,
      password: bcrypt.hashSync(password, 12),
      username,
    };
    // console.log(user);
    // Checks if email is already in use
    User.findOne({
      where: { email },
      attributes: ['email'],
    })
      .then((result) => {
        if (result) {
          response.status(400).send({ message: 'Email already exists' });
        }
      })
      // Checks if username is already in use, case insensitive query
      .then(() => {
        return User.findOne({
          where: { username: { [Sequelize.Op.iLike]: username } },
          attributes: ['username'],
        });
      })
      .then((result) => {
        if (result) {
          response.status(400).send({ message: 'Username already exists' });
        }
      })
      // Username also not in use, creates new user
      .then(() => {
        return User.create(user);
      })
      .then(() => {
        response.status(201).end();
      })
      .catch((error) => {
        if (error.name === 'SequelizeValidationError') {
          return response
            .status(422)
            .send({ message: 'Incorrect email data provided' });
        }
      });
  } else {
    response.status(400).send({ message: 'Not all data provided' });
  }
});

module.exports = router;
