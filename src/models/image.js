'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    name: { 
      type: DataTypes.STRING,
    },
    description: { 
      type: DataTypes.STRING,
    },
    file: { 
      type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Image.belongsToMany(models.Gallery, { 
          as: { singular: 'gallery', plural: 'galleries' },
          foreignKey: 'imageId',
          through: models.GalleryImage,
        });
      }
    },
    scopes: { 
      order: { 
        order: '"name" DESC'
      },
      visible: { 
        where: { visible: true }
      },
    }
  });
  return Image;
};