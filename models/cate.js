const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    label: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
  };
  const options = {
    tableName: "cate",
    comment: "",
    indexes: [],
  };
  const CateModel = sequelize.define("cate_model", attributes, options);
  return CateModel;
};
