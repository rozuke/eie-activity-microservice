const { QuestionService } = require("../service/questionService");
const service = new QuestionService();

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

module.exports = {
  getAllQuestions,
};
