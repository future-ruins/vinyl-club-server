const User = require('../Models/User');

// Gets user id back out from token
const { toData } = require('./jwt');

function auth(request, response, next) {
  // Gets headers and splits token from header
  const auth =
    request.headers.authorization && request.headers.authorization.split(' ');
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1]);
      //console.log('authMiddleware: data is', data);

      User.findByPk(data.userId)
        .then((user) => {
          if (!user) return next('User does not exist');
          request.user = user;
          next();
        })
        .catch(next);
    } catch (error) {
      response.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      });
    }
  } else {
    response.status(401).send({
      message: 'Please supply some valid credentials',
    });
  }
}

module.exports = auth;
