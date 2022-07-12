const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const ActivitySchema = sequelize.define(
  "Actividades",
  {
    actividadId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "actividad_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    tipoActividadId: {
      type: DataTypes.INTEGER,
      field: "tipoActividad_id",
    },
    cursoId: {
      type: DataTypes.INTEGER,
      field: "curso_id",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { ActivitySchema };
