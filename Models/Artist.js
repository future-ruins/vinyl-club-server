const Sequelize = require('sequelize');
const db = require('../db');
const Record = require('./Record');

const Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Artist.hasMany(Record);
Record.belongsTo(Artist);

module.exports = Artist;
