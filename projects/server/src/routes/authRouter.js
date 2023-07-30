const { authController } = require("../controllers");
const { auth } = require("../middlewares");

const router = require("express").Router();

router.post("/login", authController.login);
router.get("/user", auth.verifyToken, authController.getUserLogin);

module.exports = router;
