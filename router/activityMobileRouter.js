const { ActivityMobileService } = require("../service/activityMobileService");
const service = new ActivityMobileService();

// GET Functions
const getAllQuestions = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const questions = await service.findAllQuestionsForTypes();
    if (questions !== null) {
      callback(null, questions);
    }
  } catch (error) {
    callback(error);
  }
};

const getStudentNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { usuarioId } = event.pathParameters;
    const note = await service.findStudentNotes(usuarioId);
    if (note !== null) {
      callback(null, note);
    }
  } catch (error) {
    callback(error);
  }
};

const getLessonForBook = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const lessons = await service.findLessonsForBook();
    if (lessons !== null) {
      callback(null, lessons);
    }
  } catch (error) {
    callback(error);
  }
};

const getStudentParticipation = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { usuarioId } = event.pathParameters;
    const participation = await service.findStudentParticipation(usuarioId);
    if (participation !== null) {
      callback(null, participation);
    }
  } catch (error) {
    callback(error);
  }
};

// Post Functions
const postNewComment = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { cursoId, foroId } = event.pathParameters;
    const { contenido, usuarioId, actividadId } = JSON.parse(event.body);
    const newComment = { contenido, usuarioId, actividadId };
    const comment = await service.createNewComment(cursoId, foroId, newComment);
    callback(null, comment);
  } catch (error) {
    callback(error);
  }
};

const postNewResult = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const {
      notaHomework,
      notaEE,
      notaLaboratory,
      cantidadParticipacion,
      usuarioId,
      valoracionId,
    } = JSON.parse(event.body);
    const newResult = {
      notaHomework,
      notaEE,
      notaLaboratory,
      cantidadParticipacion,
      usuarioId,
      valoracionId,
    };
    const result = await service.createNewResult(newResult);
    if (result !== null) {
      callback(null, result);
    }
  } catch (error) {
    callback(error);
  }
};

const postNewParticipation = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { puntuacion, usuarioId, preguntaId, valoracionId } = JSON.parse(
      event.body
    );
    const newParticipation = {
      puntuacion,
      usuarioId,
      preguntaId,
      valoracionId,
    };
    const participation = await service.createNewParticipation(
      newParticipation
    );
    if (participation !== null) {
      callback(null, participation);
    }
  } catch (error) {
    callback(error);
  }
};

// Put Functions

const putStudentResult = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { resultadoId } = event.pathParameters;
    const { notaHomework, notaEE, notaLaboratory, cantidadParticipacion } =
      JSON.parse(event.body);
    const newResult = {
      notaHomework,
      notaEE,
      notaLaboratory,
      cantidadParticipacion,
    };
    const result = await service.updateStudentResult(resultadoId, newResult);
    if (result !== null) {
      callback(null, result);
    }
  } catch (error) {}
};

module.exports = {
  getAllQuestions,
  getAllCommentsForForum,
  getStudentNote,
  getLessonForBook,
  getStudentParticipation,
  postNewComment,
  postNewResult,
  postNewParticipation,
  putStudentResult,
};
