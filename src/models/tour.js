"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.hasOne(models.Comment, { foreignKey: "commentId" });
    }
  }
  Tour.init(
    {
      place: DataTypes.STRING,
      money: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      location: DataTypes.STRING,
      map: DataTypes.TEXT("long"),
      image1: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      way: DataTypes.STRING,
      vehicle: DataTypes.STRING,
      hotel: DataTypes.STRING,
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT("long"),
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Tour",
    }
  );
  return Tour;
};
