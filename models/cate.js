const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true
    },
    label: {
      type: DataTypes.CHAR(355),
      allowNull: true,
      defaultValue: "NULL",
      comment: null,
      primaryKey: false,
      field: "label",
      autoIncrement: false
    },
    desc2: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: "NULL",
      comment: null,
      primaryKey: false,
      field: "desc2",
      autoIncrement: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
      comment: null,
      primaryKey: false,
      field: "createdAt",
      autoIncrement: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
      comment: null,
      primaryKey: false,
      field: "updatedAt",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "cate",
    comment: "",
    indexes: []
  };
  const CateModel = sequelize.define("cate_model", attributes, options);
  return CateModel;
};