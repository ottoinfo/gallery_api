'use strict';

module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define('Gallery', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.INTEGER
    },
    visible: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        Gallery.belongsToMany(models.Image, { 
          as: 'images',
          foreignKey: 'galleryId',
          through: models.GalleryImage
        });
      }, 
      getImages: function(id, db) {
        console.log('ugghh')
        return Gallery.scope("visible").findById(id , {
          attributes: ["name", "description"],
          include: [{
            as: "images",
            // attributes: [["name", "image_name"], ["file", "file_name"]],
            model: db.Image,
          }],
        }).then((rawData) => {
          let data = rawData.toJSON();
          data.images = data.images.map(function(rawImage) {
            let image = {
              name: rawImage.GalleryImage.name || rawImage.name,
              description: rawImage.GalleryImage.description || rawImage.description,
              file: rawImage.file,
            };
            return image;
          });
          return data;
        });
      }
    },
    scopes: { 
      visible: { 
        where: { visible: true }
      },
      order: { 
        order: '"order" ASC'
      }
    }
  });
  return Gallery;
};