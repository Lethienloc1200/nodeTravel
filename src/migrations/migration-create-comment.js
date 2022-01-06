"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      star: {
        type: Sequelize.INTEGER,
      },

      description: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      commentId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      imageComment: {
        type: Sequelize.BLOB("long"),
      },

      userId: {
        type: Sequelize.STRING,
      },
      titleComment: {
        type: Sequelize.STRING,
      },
      typeOf: {
        type: Sequelize.STRING,
      },
      timeTravel: {
        type: Sequelize.STRING,
      },
      typeOfHotel: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Comments");
  },
};
