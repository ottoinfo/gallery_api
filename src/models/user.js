"use strict"

import bcrypt from "bcryptjs"

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: { msg: "user name is required" },
      },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "first name is required" },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "last name is required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email address" },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        fn: function(val) {
          if (!this.id && (!this.password || !this.confirmation)) {
            throw new Error("You need to submit a password and confirmation")
          }
          if (this.password != this.confirmation) {
            throw new Error("Your password and confirmation do not match")
          }
        },
      },
    },
    confirmation: {
      type: DataTypes.VIRTUAL,
    },
    checkbox: {
      type: DataTypes.VIRTUAL,
    },
  }, {
    classMethods: {
      associate: function(models) {},
    },
    hooks: {
      beforeCreate: function(user) {
        user.password = bcrypt.hashSync(user.password, 8)
      },
      beforeSave: function(user) {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 8) 
        }
      },
    },
    instanceMethods: {
      checkPassword: function(password) {
        return bcrypt.compareSync(password, this.password, 8)
      },
    },
  })

  return User
}