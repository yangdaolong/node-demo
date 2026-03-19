const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    point: {
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
