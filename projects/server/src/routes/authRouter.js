const { authController } = require("../controllers");
const { auth } = require("../middlewares");
const { errorValidate } = require("../middlewares");
const { validateAuth } = require("../services");

const router = require("express").Router();

router.post(
	"/login",
	validateAuth.loginRules,
	errorValidate,
	authController.login
);
router.get("/user", auth.verifyToken, authController.getUserLogin);

module.exports = router;
