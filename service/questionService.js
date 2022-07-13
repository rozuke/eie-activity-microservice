const { QuestionSchema } = require("../models/questionModel.js");
const { AttachedSchema } = require("../models/attachedModel.js");
const { LabelSchema } = require("../models/labelModel.js");
const { QuestionTypeSchema } = require("../models/questionTypeModel.js");
const { BookSchema } = require("../models/bookModel.js");
require("../models/asociation.js");
class QuestionService {
  async findAllQuestions() {
    const questions = await QuestionSchema.findAll();
    return questions;
  }

  async findAllQuestionsForTypes() {
    const questions = await QuestionSchema.findAll({
      include: [
        {
          model: BookSchema,
        },
        {
          model: QuestionTypeSchema,

          attributes: ["tipo"],
        },
        {
          model: AttachedSchema,
          attributes: ["enlace", "respuestaCorrecta", "codigo", "formato"],
        },
        {
          model: LabelSchema,

          attributes: ["nombre", "opcion", "secuencia", "tipoEtiquetaId"],
        },
      ],
      attributes: ["preguntaId", "enunciado", "orden"],
    });
    return questions;
  }

  async findAllAttacheds() {
    const attacheds = await AttachedSchema.findAll();
    return attacheds;
  }

  async findAllLabels() {
    const labels = await LabelSchema.findAll();
    return labels;
  }
}

module.exports = { QuestionService };
