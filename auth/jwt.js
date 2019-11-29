const jwt = require('jsonwebtoken');

// Sets secret key
const secret =
  process.env.JWT_SECRET || 'e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m';

// Creates JW Token and sets expiry time (2h for testing purposes)
function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: '2h' });
}

// Verifies token
function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };
