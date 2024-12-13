const mongoose = require("mongoose");

//This schema will represent categories that can be used to classify blog posts. It can help in organizing content and enhancing user navigation.
const categorySchema = new mongoose.Schema({
  name: {
    //Timestamp for when the comment was created
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    //Brief description of the category (optional)
    type: String,
    trim: true,
  },
  createdAt: {
    //Timestamp for when the category was created
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
