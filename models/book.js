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
      type: DataTypes.CHAR,
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
  };
  const options = {
    tableName: "book",
    comment: "",
    indexes: [],
  };
  const BookModel = sequelize.define("book_model", attributes, options);
  return BookModel;
};
