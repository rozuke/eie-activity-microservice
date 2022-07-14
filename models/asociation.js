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
    field: "pre_tipo_id",
  },
});
QuestionSchema.belongsTo(QuestionTypeSchema);

BookSchema.hasOne(QuestionSchema, {
  foreignKey: {
    field: "pre_libro_id",
  },
});
QuestionSchema.belongsTo(BookSchema);

// Attached asociations
QuestionSchema.hasMany(AttachedSchema, {
  foreignKey: {
    field: "adj_pregunta_id",
  },
});
AttachedSchema.belongsTo(QuestionSchema);

// Label asociations
QuestionSchema.hasMany(LabelSchema, {
  foreignKey: {
    field: "eti_pregunta_id",
  },
});
LabelSchema.belongsTo(QuestionSchema);

// Comments associations
ForumActivitySchema.hasMany(CommentSchema, {
  foreignKey: {
    field: "com_actividad_foro_id",
  },
});
CommentSchema.belongsTo(ForumActivitySchema);
