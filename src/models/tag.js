"use strict"

module.exports = function(sequelize, DataTypes) {
  const Tag = sequelize.define("Tag", {
    name: { 
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [1,255],
          msg: "Tag Name can't be blank",
        },
      },
    },
  }, {
    classMethods: {
      associate: function(models) {},
    },
    scopes: { 
      order: { 
        order: "\"name\" DESC",
      },
    },
  })

  return Tag
}