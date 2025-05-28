const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port: dbConfig.PORT,
    logging: true, 
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require('./customer.model')(sequelize, Sequelize);

module.exports = db;
