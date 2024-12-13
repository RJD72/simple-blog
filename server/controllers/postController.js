const Post = require("../models/BlogPostModel");
const customError = require("../utils/CustomError");
const uploadImage = require("../utils/uploadImage");
const multer = require("multer");
const postSchema = require("../joiSchemas/postSchema");
const xss = require("xss");

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const validMimetypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    if (!validMimetypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true); // Accept the file
  },
});

exports.createPost = async (req, res, next) => {
  // Role-based authorization
  if (req.user.role !== "admin") {
    return next(customError("Unauthorized", 403));
  }

  // Validate request body
  const validatedData = await postSchema.postSchema.validateAsync(req.body);

  // Sanitize inputs to prevent XSS
  validatedData.title = xss(validatedData.title);
  validatedData.content = xss(validatedData.content);

  // Generate slug from the sanitized title
  const slug = validatedData.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, ""); // Keep only alphanumeric and dashes

  // Create the new post
  const newPost = new Post({
    ...validatedData,
    slug,
    author: req.user._id, // Authenticated user's ID
  });

  // Save the post to the database
  try {
    const savedPost = await newPost.save();
    res.status(201).json({ message: "Post created successfully", savedPost });
  } catch (error) {
    if (error.isJoi) {
      return next(customError(error.details[0].message, 400));
    }
    return next(error);
  }
};

// Exporting the `getPost` function as a middleware for handling HTTP requests
exports.getPost = async (req, res, next) => {
  try {
    // Extracting `startIndex` and `limit` from the query parameters to implement pagination
    // If not provided, default `startIndex` to 0 and `limit` to 10
    const startIndex = +req.query.startIndex || 0; // Convert to number using unary `+`
    const limit = +req.query.limit || 9; // Default limit to 10 if not specified

    // Determine the sorting direction based on the query parameter `order`
    // If `order` is "asc", use 1 (ascending), otherwise use -1 (descending)
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    // Query the `Post` collection with dynamic filters based on provided query parameters
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }), // Filter by `userId` if provided
      ...(req.query.category && { categories: req.query.category }), // Filter by `category` if provided
      ...(req.query.slug && { slug: req.query.slug }), // Filter by `slug` if provided
      ...(req.query.postId && { _id: req.query.postId }), // Filter by `_id` (postId) if provided
      ...(req.query.searchTerm && {
        // Perform a case-insensitive search on `title` and `content` if `searchTerm` is provided
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } }, // Match `title` field
          { content: { $regex: req.query.searchTerm, $options: "i" } }, // Match `content` field
          { categories: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection }) // Sort posts by `updatedAt` in the specified direction
      .skip(startIndex) // Skip the first `startIndex` documents for pagination
      .limit(limit); // Limit the result set to `limit` documents for pagination

    // Get the total number of posts in the collection
    const totalPosts = await Post.countDocuments();

    // Create a Date object representing the current date and time
    const now = new Date();

    // Calculate a Date object representing one month ago from today
    const oneMonthAgo = new Date(
      now.getFullYear(), // Current year
      now.getMonth() - 1, // Subtract 1 month
      now.getDate() // Current day of the month
    );

    // Count the number of posts created in the last month
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo }, // Filter by `createdAt` greater than or equal to `oneMonthAgo`
    });

    // Send a JSON response with the fetched posts and additional metadata
    res.status(200).json({
      posts, // Array of posts matching the query
      totalPosts, // Total number of posts in the collection
      lastMonthPosts, // Number of posts created in the last month
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

exports.uploadPhoto = async (req, res, next) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return next(customError("No file uploaded", 400));
    }

    // Upload the file to Cloudinary
    const imageUrl = await uploadImage(req.file);

    // Return the secure URL
    return res.status(201).json({ imageUrl });
  } catch (error) {
    // Handle multer errors
    if (error instanceof multer.MulterError) {
      return next(customError(error.message, 400));
    }
    // Handle other errors
    console.error("Image upload failed:", error.message);
    return next(customError("Failed to upload image.", 500));
  }
};

exports.deletePost = async (req, res, next) => {
  // Delete a post by its ID and return a success response
  if (req.user.role !== "admin") {
    return next(new customError("Unauthorized", 403));
  }
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  // Update a post by its ID and return the updated post
  if (req.user.role !== "admin") {
    return next(new customError("Unauthorized", 403));
  }

  try {
    const validatedData = await postSchema.updatePostSchema.validateAsync(
      req.body
    );

    validatedData.title = xss(validatedData.title);
    validatedData.content = xss(validatedData.content);

    if (validatedData.title) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-")
        .replace(/[^a-zA-Z0-9-]/g, "");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: validatedData },
      { new: true }
    );

    if (!updatedPost) {
      return next(new customError("Post not found", 404));
    }

    return res
      .status(200)
      .json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.error("Post update failed:", error.message);
    return next(error);
  }
};
