const { QuestionSchema } = require("../models/questionModel.js");
const { AttachedSchema } = require("../models/attachedModel.js");
const { LabelSchema } = require("../models/labelModel.js");
const { QuestionTypeSchema } = require("../models/questionTypeModel.js");
const { BookSchema } = require("../models/bookModel.js");
const { ForumActivitySchema } = require("../models/forumActivityModel.js");
const { CommentSchema } = require("../models/commentModel.js");
const { CourseSchema } = require("../models/courseModel.js");
const { ResultSchema } = require("../models/resultModel.js");
const { LessonSchema } = require("../models/lessonModel.js");
const { ParticipationSchema } = require("../models/participationModel.js");
require("../models/asociation.js");
class QuestionService {
  // Find Functions
  async findTest() {
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
          attributes: [
            "enlace",
            "respuestaCorrecta",
            "descripcion",
            "formato",
            "codigo",
          ],
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

  async findAllTopicForCourse(id) {
    const topics = await ForumActivitySchema.findAll({
      where: {
        cursoId: id,
      },
      attributes: ["topico", "descripcion", "cursoId"],
    });

    return topics === null ? null : topics;
  }

  async findAllCommentsForForum(cursoId, foroId) {
    const comments = await ForumActivitySchema.findAll({
      where: {
        actividadId: foroId,
        cursoId: cursoId,
      },
      include: [
        {
          model: CommentSchema,
          attributes: ["contenido", "usuarioId"],
        },
      ],
      attributes: ["actividadId", "cursoId", "topico", "descripcion"],
    });

    return comments;
  }

  async findStudentNotes(id) {
    const studentNote = await ResultSchema.findAll({
      where: {
        usuarioId: id,
      },
      attributes: [
        "usuarioId",
        "resultadoId",
        "notaHomework",
        "notaEE",
        "notaLaboratory",
        "cantidadParticipacion",
      ],
    });
    return studentNote;
  }

  async findLessonsForBook() {
    const lessons = await BookSchema.findAll({
      include: [
        {
          model: LessonSchema,
          attributes: ["nombre"],
        },
      ],
      attributes: ["libroId", "nombre", "nivel"],
    });
    return lessons;
  }

  async findStudentParticipation(id) {
    const studentParticipations = await ParticipationSchema.findAll({
      where: {
        usuarioId: id,
      },
      include: [
        {
          model: QuestionSchema,
          attributes: ["preguntaId"],
          include: [
            {
              model: QuestionTypeSchema,
              attributes: ["tipo", "codigo"],
            },
          ],
        },
      ],
      attributes: [
        "participacionId",
        "puntuacion",
        "usuarioId",
        "valoracionId",
      ],
    });
    return studentParticipations;
  }
}

module.exports = { QuestionService };
