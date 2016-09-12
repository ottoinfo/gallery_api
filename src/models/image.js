"use strict"

import helper from "../helpers/sequelize"
import configFiles from "../config/files.json"

module.exports = function(sequelize, DataTypes) {
  const Image = sequelize.define("Image", {
    destationName: { 
      type: DataTypes.STRING,
    },
    fileName: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    slug: { 
      type: DataTypes.STRING,
    },
    tags: {
      defaultValue: [],
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  }, {
    classMethods: {
      associate: function(models) {
        Image.belongsToMany(models.Gallery, { 
          as: { singular: "gallery", plural: "galleries" },
          foreignKey: "imageId",
          through: models.GalleryImage,
        })
        // Image.hasMany(models.Tag, {
        //   include: [{
        //     model: models.Tag,
        //     as: "tags",
        //   }]
        // })
      },
    },
    getterMethods   : {
      paths: function() {
        const paths = {}
        Object.keys(configFiles).map(key => {
          const item = configFiles[key]
          paths[key] = `/${item.path}${item.folder}/${this.fileName}`
        })
        return paths
      },
    },
    hooks: {
      afterValidate: function(image) {
        console.log("after validation", image)
        image.slug = helper.createSlug(image.name)
      },
    },
    scopes: { 
      order: { 
        order: "\"name\" DESC",
      },
      visible: { 
        where: { 
          visible: true,
        },
      },
    },
  })

  return Image
}