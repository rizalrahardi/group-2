const { userController } = require("../controllers");
const { auth, multer } = require("../middlewares");
const { validateUser } = require("../services");
const { errorValidate } = require("../middlewares");
const router = require("express").Router();

router.post("/cashier", auth.verifyToken, validateUser.CreateCashierRules, errorValidate, userController.createCashier);
router.patch("/cashier/:id", userController.updateCashier);
// router.patch("/cashier/activate/:id", userController.deactivateCashier);
router.patch(
	"/cashier",
	auth.verifyToken,
	multer.multerUpload.single("imgProfile"),
	multer.handleFileSizeError,
	userController.changeAvatarCashier
);
router.get("/cashier", auth.verifyToken, userController.getAllCashier)
module.exports = router;
