require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("customer", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prénom est requis." },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom est requis." },
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
      allowNull: true,
    }
  }, {
    timestamps: true
  });

  return Customer;
};

