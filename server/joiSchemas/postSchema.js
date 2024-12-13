const Joi = require("joi");

exports.postSchema = Joi.object({
  title: Joi.string().min(5).max(150).required(),
  content: Joi.string().min(10).required(),
  image: Joi.string().uri().optional(),
  categories: Joi.array().items(Joi.string().max(30)).max(10).optional(),
});

exports.updatePostSchema = Joi.object({
  __v: Joi.number().optional(),
  createdAt: Joi.string().optional(),
  isPublished: Joi.boolean().optional(),
  comments: Joi.array().items(Joi.string()).optional(),
  slug: Joi.string().optional(),
  author: Joi.string().optional(),
  _id: Joi.string().optional(),
  title: Joi.string().min(5).max(150).optional(),
  content: Joi.string().min(10).optional(),
  image: Joi.string()
    .uri()
    .optional()
    .custom((value, helpers) => {
      const url = new URL(value);
      if (!url.hostname.includes("cloudinary.com")) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Cloudinary URL validation"),
  categories: Joi.array().items(Joi.string().max(30)).max(10).optional(),
});
