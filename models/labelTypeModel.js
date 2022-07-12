const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const LabelTypeSchema = sequelize.define(
  "TipoEtiqueta",
  {
    tipoEtiquetaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "tipo_etq_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    codigo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = { LabelTypeSchema };
