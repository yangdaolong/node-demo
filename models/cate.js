const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
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
