'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      userName: "admin",
      firstName: "Test",
      lastName: "Admin",
      email: "test@admin.com",
      password: "password",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      userName: "daniel",
      firstName: "Daniel",
      lastName: "Leavit",
      email: "daniel@admin.com",
      password: "password",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      userName: "otto",
      firstName: "Matthew",
      lastName: "Otto",
      email: "otto@admin.com",
      password: "password",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
