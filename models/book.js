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
  };
  const options = {
    tableName: "book",
    comment: "",
    indexes: [],
  };
  const BookModel = sequelize.define("book_model", attributes, options);

  return BookModel;
};
