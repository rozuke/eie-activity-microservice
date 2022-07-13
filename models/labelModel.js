const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const LabelSchema = sequelize.define(
  "etiquetas",
  {
    etiquetaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "etiqueta_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    secuencia: {
      type: DataTypes.SMALLINT,
    },
    opcion: {
      type: DataTypes.BOOLEAN,
    },
    preguntaId: {
      type: DataTypes.INTEGER,
      field: "pregunta_fk",
    },

    tipoEtiquetaId: {
      type: DataTypes.INTEGER,
      field: "tipo_etq_fk",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Etiqueta",
  }
);

module.exports = { LabelSchema };
