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
  const CateModel = require("./cate")(sequelize);
  const UserModel = require("./user")(sequelize);
  BookModel.belongsTo(CateModel, {
    foreignKey: "cateid",
  });
  BookModel.belongsTo(UserModel, {
    foreignKey: "userid",
    targetKey: "id",
  });

  return BookModel;
};
