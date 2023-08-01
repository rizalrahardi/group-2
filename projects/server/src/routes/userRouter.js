const { userController } = require("../controllers");
const { auth, multer } = require("../middlewares");
const { verifyToken } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/cashier",verifyToken, userController.createCashier);
router.patch("/cashier/:id", userController.updateCashier);
// router.patch("/cashier/activate/:id", userController.deactivateCashier);
router.patch(
	"/cashier",
	verifyToken,
	multer.multerUpload.single("imgProfile"),
	multer.handleFileSizeError,
	userController.changeAvatarCashier
);
router.get("/cashier", verifyToken, userController.getAllCashier)
module.exports = router;
