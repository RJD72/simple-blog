const router = require("express").Router();
const verifyToken = require("../helpers/verifyToken");
const postController = require("../controllers/postController");
const multer = require("multer");
const upload = multer();

router.post("/create-post", verifyToken, postController.createPost);
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  postController.uploadPhoto
);
router.get("/get-post", postController.getPost);
router.delete("/delete-post/:id", verifyToken, postController.deletePost);
router.patch("/update-post/:id", verifyToken, postController.updatePost);
module.exports = router;
