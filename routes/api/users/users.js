const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/controllerUsers");
const guard = require("../../../helpers/guard");
const {accountLimiter} = require("../../../helpers/rateLimits");

router.post("/register", accountLimiter, usersController.reg);
router.post("/login", usersController.login);
router.post("/logout", guard, usersController.logout);
router.get("/current", guard, usersController.getCurrentUser);

module.exports = router;
