const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
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
    tableName: "pan",
    comment: "",
    indexes: [],
  };
  const PanModel = sequelize.define("pan_model", attributes, options);

  return PanModel;
};
