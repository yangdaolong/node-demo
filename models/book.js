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
    name: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: "NULL",
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
