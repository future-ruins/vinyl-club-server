const Sequelize = require('sequelize');
const db = require('../db');
const Comment = require('./Comment');

const Record = db.define('records', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  format: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Record.hasMany(Comment);
Comment.belongsTo(Record);

module.exports = Record;
