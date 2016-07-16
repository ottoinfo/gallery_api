'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUnique: { msg: "Username already exists" },
      },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isNotNull: { msg: 'First Name is required' },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {},
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUnique: { msg: "Email already exists" },
        isEmail: { msg: 'Invalid email address' },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isNotNull: { msg: 'Password is required'}
      },
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};