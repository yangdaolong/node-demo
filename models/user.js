const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
    },
    username: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: "NULL",
      comment: null,
      primaryKey: false,
      field: "username",
      autoIncrement: false,
    },
    password: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: "NULL",
      comment: null,
      primaryKey: false,
      field: "password",
      autoIncrement: false,
    },
    num: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "num",
      autoIncrement: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("now"),
      comment: null,
      primaryKey: false,
      field: "createdAt",
      autoIncrement: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("now"),
      comment: null,
      primaryKey: false,
      field: "updatedAt",
      autoIncrement: false,
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
