const router = require("express").Router();
const verifyToken = require("../helpers/verifyToken");
const commentController = require("../controllers/commentController");

router.post("/create-comment", verifyToken, commentController.createComment);
router.get("/get-post-comments/:postId", commentController.getPostsComments);
router.put(
  "/like-comment/:commentId",
  verifyToken,
  commentController.likeComment
);
router.delete(
  "/delete-comment/:commentId",
  verifyToken,
  commentController.deleteComment
);
router.put(
  "/edit-comment/:commentId",
  verifyToken,
  commentController.editComment
);
router.get("/get-comments", verifyToken, commentController.getComments);

module.exports = router;
