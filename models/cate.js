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
    label: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "label",
      autoIncrement: false,
    },
    desc: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "desc",
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
    tableName: "cate",
    comment: "",
    indexes: [],
    paranoid: true,
  };
  const CateModel = sequelize.define("cate_model", attributes, options);
  return CateModel;
};
