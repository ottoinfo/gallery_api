"use strict"

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      destationName: { 
        type: Sequelize.STRING,
      },
      fileName: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("Images")
  },
}