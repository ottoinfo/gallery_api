"use strict"

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Images",
    [{
      fileName: "https://placekitten.com/800/1001",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      fileName: "https://placekitten.com/800/1002",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      fileName: "https://placekitten.com/800/1003",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Images", null, {})
  },
}
