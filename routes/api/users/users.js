const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/controllerUsers");
const guard = require("../../../helpers/guard");
// const {accountLimiter} = require("../../../helpers/rateLimits");
const upload = require("../../../helpers/upload");
const {validateUploadAvatar} = require("./validation");

// accountLimiter, - message - not found

router.post("/register", usersController.reg);
router.post("/login", usersController.login);
router.post("/logout", guard, usersController.logout);
router.get("/current", guard, usersController.getCurrentUser);
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validateUploadAvatar],
  usersController.avatars
);
router.get("/verify/:verifyToken", usersController.verify);

module.exports = router;
