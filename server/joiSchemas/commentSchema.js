const Joi = require("joi");

exports.commentSchema = Joi.object({
  postId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message("Invalid postId format"),
  author: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message("Invalid author format"),
  content: Joi.string().min(10).max(200).required(),
  likes: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid user id format")
    )
    .optional(),
  numberOfLikes: Joi.number().optional(),
  createdAt: Joi.date().optional(),
});

exports.updateCommentSchema = Joi.object({
  postId: Joi.string()
    .optional()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message("Invalid postId format"),
  author: Joi.string()
    .optional()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message("Invalid author format"),
  content: Joi.string().min(10).max(200).required(),
  likes: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid user id format")
    )
    .optional(),
  numberOfLikes: Joi.number().optional(),
  createdAt: Joi.date().optional(),
});
