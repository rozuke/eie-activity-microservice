const { QuestionService } = require("../service/activityMobileService");
const service = new QuestionService();

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

const getAllForumTopics = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId } = event.pathParameters;
    console.log(cursoId);
    const topics = await service.findAllTopicForCourse(cursoId);
    if (topics !== null) {
      callback(null, topics);
    }
  } catch (error) {}
  callback(error);
};

const getAllCommentsForForum = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId, foroId } = event.pathParameters;
    const comments = await service.findAllCommentsForForum(cursoId, foroId);
    if (comments !== null) {
      callback(null, comments);
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

module.exports = {
  getAllQuestions,
  getAllForumTopics,
  getAllCommentsForForum,
  getStudentNote,
  getLessonForBook,
  getStudentParticipation,
};
