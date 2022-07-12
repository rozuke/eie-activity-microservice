const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const CommentSchema = sequelize.define(
  "Comentarios",
  {
    comentarioId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "comentario_id",
    },
    contenido: {
      type: DataTypes.STRING,
    },
    actividadId: {
      type: DataTypes.INTEGER,
      field: "actividad_id",
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: "usuario_id",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { CommentSchema };
