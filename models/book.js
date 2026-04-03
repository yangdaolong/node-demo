const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    name: {
      type: DataTypes.STRING,
    },
    userid: {
      type: DataTypes.INTEGER,
    },
    cateid: {
      type: DataTypes.UUID,
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
