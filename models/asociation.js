const { QuestionSchema } = require("./questionModel.js");
const { AttachedSchema } = require("./attachedModel.js");
const { LabelSchema } = require("./labelModel.js");
const { QuestionTypeSchema } = require("./questionTypeModel.js");
const { BookSchema } = require("./bookModel.js");
const { LabelTypeSchema } = require("./labelTypeModel.js");
const { CommentSchema } = require("./commentModel.js");
const { ForumActivitySchema } = require("./forumActivityModel.js");
// Question asociations
QuestionTypeSchema.hasOne(QuestionSchema, {
  foreignKey: {
    field: "tipo_fk",
  },
});
QuestionSchema.belongsTo(QuestionTypeSchema);

BookSchema.hasOne(QuestionSchema, {
  foreignKey: {
    field: "libro_fk",
  },
});
QuestionSchema.belongsTo(BookSchema);

// Attached asociations
QuestionSchema.hasMany(AttachedSchema, {
  foreignKey: {
    field: "pregunta_fk",
  },
});
AttachedSchema.belongsTo(QuestionSchema);

// Label asociations
QuestionSchema.hasMany(LabelSchema, {
  foreignKey: {
    field: "pregunta_fk",
  },
});
LabelSchema.belongsTo(QuestionSchema);

// Comments associations
ForumActivitySchema.hasMany(CommentSchema, {
  foreignKey: {
    field: "actividad_foro_id",
  },
});
CommentSchema.belongsTo(ForumActivitySchema);
