const Sequelize = require('sequelize');
const db = require('../db');
const Record = require('./Record');
const Comment = require('./Comment');

const User = db.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    isUnique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isUnique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.hasMany(Record);
Record.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = User;
