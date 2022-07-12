const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");
const { BookSchema } = require("./bookModel.js");
const { QuestionTypeSchema } = require("./questionTypeModel.js");

const QuestionSchema = sequelize.define(
  "Pregunta",
  {
    preguntaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "pregunta_id",
    },
    enunciado: {
      type: DataTypes.STRING,
    },
    orden: {
      type: DataTypes.INTEGER,
    },
    // libroId: {
    //   type: DataTypes.INTEGER,
    //   field: "libro_fk",
    // },
    // tipoId: {
    //   type: DataTypes.INTEGER,
    //   field: "tipo_fk",
    // },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Question asociations

module.exports = { QuestionSchema };
