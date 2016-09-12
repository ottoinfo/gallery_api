"use strict"

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("GalleryImages", [{
      galleryId: 1,
      imageId: 1,
      name: "Gallery 1",
      description: "Desc 1",
      order: "1",
      visible: "1",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      galleryId: 1,
      imageId: 2,
      name: "Gallery 2",
      description: "Desc 2",
      order: "1",
      visible: "1",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      galleryId: 1,
      imageId: 3,
      name: "Gallery 3",
      description: "Desc 3",
      order: "1",
      visible: "1",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      galleryId: 2,
      imageId: 1,
      name: "Gallery 1",
      description: "Desc 1",
      order: "1",
      visible: "1",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      galleryId: 2,
      imageId: 2,
      name: "Gallery 2",
      description: "Desc 2",
      order: "1",
      visible: "1",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      galleryId: 3,
      imageId: 3,
      name: "Gallery 3",
      description: "Desc 3",
      order: "1",
      visible: "1",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {})
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Galleries", null, {})
  },
}
