"use strict"

// Password(bcrypt hash) => test
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [{
      userName: "admin",
      firstName: "Test",
      lastName: "Admin",
      email: "test@admin.com",
      password: "$2a$08$TUW4VqZUjIeKu8oxaZmrS.8ZYixCMC1LX.Sid1ccv9H4Cc.i4n7mW",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      userName: "daniel",
      firstName: "Daniel",
      lastName: "Leavit",
      email: "daniel@admin.com",
      password: "$2a$08$TUW4VqZUjIeKu8oxaZmrS.8ZYixCMC1LX.Sid1ccv9H4Cc.i4n7mW",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }, {
      userName: "otto",
      firstName: "Matthew",
      lastName: "Otto",
      email: "otto@admin.com",
      password: "$2a$08$TUW4VqZUjIeKu8oxaZmrS.8ZYixCMC1LX.Sid1ccv9H4Cc.i4n7mW",
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {})
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {})
  },
}
