"use strict"

import helper from "../helpers/sequelize"

module.exports = function(sequelize, DataTypes) {
  const Gallery = sequelize.define("Gallery", {
    slug: {
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,255],
          msg: "Name can't be blank",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    visible: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: function(models) {
        Gallery.belongsToMany(models.Image, { 
          as: "images",
          foreignKey: "galleryId",
          through: models.GalleryImage,
        })
      }, 
      getImages: function(id, db) {
        console.log("ugghh")
        return Gallery.scope("visible").findById(id , {
          attributes: ["name", "description"],
          include: [{
            as: "images",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
            model: db.Image,
          }],
        })
      },
      getAllImages: function(id, db) {
        return Gallery.scope("visible").findById(id).then(function(gallery) {
          return gallery.getImages({
            attributes: ["name"], 
            joinTableAttributes: ["description"],
          })
        })
      },
    },
    hooks: {
      afterValidate: function(gallery) {
        gallery.slug = helper.createSlug(gallery.name)
      },
    },
    scopes: { 
      visible: { 
        where: { visible: true },
      },
      order: { 
        order: "\"order\" ASC",
      },
    },
  })

  return Gallery
}