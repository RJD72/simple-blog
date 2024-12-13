const userController = require("../controllers/userController");
const verifyToken = require("../helpers/verifyToken");
const multer = require("multer");
const upload = multer();

const router = require("express").Router();

router.get("/get-user/:id", verifyToken, userController.getLoggedUserProfile);
router.get("/get-users", verifyToken, userController.getUsers);
router.get("/comment-author/:author", userController.getUser);
router.patch("/update/:id", verifyToken, userController.updateUser);
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  userController.uploadPhoto
);
router.delete("/delete-user/:id", verifyToken, userController.deleteUser);

module.exports = router;
