var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/tripplanner'); //defines where our database is

module.exports = db;