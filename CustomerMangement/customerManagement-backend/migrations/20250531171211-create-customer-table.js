'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customers',{
    id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate : {
      notEmpty: { msg : "Le nom et le prénom sont requis "
      }
    }
   },
   email: {
    type : Sequelize.STRING,
    allowNull: false,
    unique: true,
      validate: {
        isEmail: { msg: "Adresse email invalide." },
      }
   },
   phone: {
    type : Sequelize.STRING,
    allowNull: true
   },
   status: {
    type: Sequelize.ENUM('Actif','Inactif'),
    defaultValue : 'Actif',
    allowNull : false
   },
   createdAt : {
    allowNull : false,
    type: Sequelize.DATE,
    defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
   },
   updatedAt: {
    allowNull : false,
    type: Sequelize.DATE,
    defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
   }
    });
   },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customers')
  }
};
