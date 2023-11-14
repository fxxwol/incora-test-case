const Sequelize = require('sequelize');
const config = require('../config')[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(config.postgres.options);

module.exports = sequelize;
