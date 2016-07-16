'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [{
      name: "Image 1",
      description: "Description 1",
      file: "https://placekitten.com/800/1001",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      name: "Image 2",
      description: "Description 2",
      file: "https://placekitten.com/800/1002",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      name: "Image 3",
      description: "Description 3",
      file: "https://placekitten.com/800/1003",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Images', null, {})
  }
};
