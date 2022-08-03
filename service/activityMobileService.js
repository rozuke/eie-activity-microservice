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
class ActivityMobileService {
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

  // Create Functions

  // async createNewForumTopic(cursoId, newForo) {
  //   const course = await CourseSchema.findAll({
  //     where: {
  //       cursoId: cursoId,
  //     },
  //   });
  //   if (newForumTopic === null) {
  //     throw new Error("Course not found");
  //   } else {
  //     const topic = await ForumActivitySchema.create(newForo);
  //     return topic;
  //   }
  // }

  async createNewComment(cursoId, foroId, newComment) {
    const course = await CourseSchema.findOne({
      where: {
        cursoId: cursoId,
      },
    });
    const forum = await ForumActivitySchema.findOne({
      where: {
        actividadId: foroId,
      },
    });

    if (course !== null && forum !== null) {
      const comment = await CommentSchema.create(newComment);
      return comment;
    }
  }

  async createNewResult(newResult) {
    const result = await ResultSchema.create(newResult);
    return result;
  }

  async createNewParticipation(newParticipation) {
    const participation = await ParticipationSchema.create(newParticipation);
    return participation;
  }

  // Update Functions

  async updateStudentResult(id, newNote) {
    const result = await ResultSchema.findOne({
      where: {
        resultadoId: id,
      },
    });
    if (result !== null) {
      const newResult = result.update(newNote);
      return newResult;
    }
  }
}

module.exports = { ActivityMobileService };
