const mongoose = require("mongoose");

//This schema will represent individual blog posts. It will include details about the author, the content, title, and other metadata like categories and timestamps.
const postSchema = new mongoose.Schema({
  title: {
    //Title of the pos
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  content: {
    //Main content of the post
    type: String,
    required: true,
  },
  author: {
    //Reference to the user who created the post
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: {
    //Categories or tags that describe the post
    type: [String],
    default: [],
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1654124803058-c814dc42f60c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  comments: [
    //An array of comments (references or embedded)
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    //Timestamp for when the post was created
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    //Timestamp for the last update
    type: Date,
  },
  isPublished: {
    //Boolean to indicate if the post is live or in draft
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("BlogPost", postSchema);
