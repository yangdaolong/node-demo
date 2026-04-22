const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  };
  const options = {
    tableName: "user",
    comment: "",
    indexes: [],
  };
  const UserModel = sequelize.define("user_model", attributes, options);

  return UserModel;
};
