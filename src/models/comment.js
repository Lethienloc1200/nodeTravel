"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.Tour, { foreignKey: "commentId" });
    }
  }
  Comment.init(
    {
      description: DataTypes.TEXT("long"),
      star: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      userId: DataTypes.STRING,
      titleComment: DataTypes.STRING,
      typeOf: DataTypes.STRING,
      timeTravel: DataTypes.STRING,
      imageComment: DataTypes.BLOB("long"),
      typeOfHotel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
