// models/customer.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom et prénom sont requis." },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Adresse email invalide." },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Actif",
      validate: {
        isIn: {
          args: [["Actif", "Inactif"]],
          msg: "Le statut doit être Actif ou Inactif."
        }
      }
    }
  }, {
    tableName: 'customers',
    timestamps: false,
  });

  return Customer;
};
