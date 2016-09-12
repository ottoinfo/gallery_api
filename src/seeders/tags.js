"use strict"

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tags",
    [{
      name: "Tag 1",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      name: "Tag 2",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      name: "Tag 3",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {})
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tags", null, {})
  },
}
