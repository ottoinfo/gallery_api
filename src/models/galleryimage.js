'use strict';
module.exports = function(sequelize, DataTypes) {
  var GalleryImage = sequelize.define('GalleryImage', {
    galleryId: { 
      type: DataTypes.INTEGER
    },
    imageId: { 
      type: DataTypes.INTEGER
    },
    name: { 
      type: DataTypes.STRING
    },
    description: { 
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.INTEGER,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    classMethods: {
      associate: function(models) {
        GalleryImage.belongsTo(models.Image);
        // GalleryImage.belongsTo(models.Gallery);
      }
    }
  });
  return GalleryImage;
};