const { customError } = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Comment = require("../models/CommentModel");
const {
  commentSchema,
  updateCommentSchema,
} = require("../joiSchemas/commentSchema");
const xss = require("xss");

exports.createComment = async (req, res, next) => {
  try {
    const validatedData = await commentSchema.validateAsync(req.body);

    if (validatedData.author !== req.user.id) {
      return next(
        new customError("You are not authorized to create a comment", 401)
      );
    }

    validatedData.content = xss(validatedData.content);

    const { content, postId, author } = validatedData;

    const newComment = new Comment({
      content,
      postId,
      author,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.error("Error adding comment:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPostsComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(new customError("Comment not found", 404));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(new customError("Comment not found", 404));
    }
    if (comment.author !== req.user.id && req.user.role !== "admin") {
      return next(
        new customError("You are not authorized to delete this comment", 403)
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.editComment = async (req, res, next) => {
  try {
    const validatedData = await updateCommentSchema.validateAsync(req.body);

    validatedData.content = xss(validatedData.content);

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(new customError("Comment not found", 404));
    }
    if (comment.author !== req.user.id && req.user.role !== "admin") {
      return next(
        new customError("You are not authorized to edit this comment", 403)
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: validatedData.content },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

exports.getComments = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(customError("Unauthorized", 403));
  }
  try {
    const startIndex = +req.query.startIndex || 0;
    const limit = +req.query.limit || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthsComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      comments,
      totalComments,
      lastMonthsComments,
    });
  } catch (error) {
    next(error);
  }
};
