"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      place: {
        type: Sequelize.STRING,
      },
      money: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      way: {
        type: Sequelize.STRING,
      },
      vehicle: {
        type: Sequelize.STRING,
      },
      hotel: {
        type: Sequelize.STRING,
      },

      image: {
        type: Sequelize.BLOB("long"),
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tours");
  },
};
