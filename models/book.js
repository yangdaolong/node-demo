const { on } = require("koa");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "userid",
      autoIncrement: false,
    },
    cateid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "cateid",
      autoIncrement: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "createdAt",
      autoIncrement: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "updatedAt",
      autoIncrement: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "deletedAt",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "book",
    comment: "",
    indexes: [],
    paranoid: true,
  };
  const BookModel = sequelize.define("book_model", attributes, options);

  return BookModel;
};
