const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    //Reference to the post the comment is associated with
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
    required: true,
  },
  author: {
    //Reference to the user who made the comment
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    //The content of the comment
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    //Timestamp for when the comment was created
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
