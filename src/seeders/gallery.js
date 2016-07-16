'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Galleries', [{
      id: 1,
      name: "Gallery 1",
      description: "Desc 1",
      order: 1,
      visible: true,
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      id: 2,
      name: "Gallery 2",
      description: "Desc 2",
      order: 1,
      visible: true,
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      id: 3,
      name: "Gallery 3",
      description: "Desc 3",
      order: 1,
      visible: true,
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Galleries', null, {})
  }
};