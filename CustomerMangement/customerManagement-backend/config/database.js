require('dotenv').config();
const mysql = require('mysql2/promise');
const {Sequelize} = require('sequelize')

const sequelize  =  new Sequelize(
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
   {
    host: process.env.DB_HOST, 
    dialect: 'mysql',        
  }
)
//Fonction pour tester la connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Test de connexion à mysql reussie');
  } catch (error) {
    console.error('Impossiblede se connecter à la base de données ', error.message);
    throw error;
  }
}
module.exports = {
  sequelize,
  testConnection
};
