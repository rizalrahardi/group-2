const router = require("express").Router();
const {productController} = require('../controllers');
const { verifyToken } = require("../middlewares/auth");
const { errorValidate } = require("../middlewares");
const { multerUpload } = require("../middlewares/multer");
const { validateProduct } = require("../services");

router.get("/", verifyToken, productController.getProductList )
module.exports = router
router.post(
    "/category",
	verifyToken,
	validateProduct.categoryRules,
	errorValidate,
	productController.createCategory
)
router.get(
	"/category",
	verifyToken,
	productController.getCategory
)
router.patch(
    "/category/:id",
	verifyToken,
	validateProduct.categoryRules,
	errorValidate,
	productController.editCategory
)
router.delete(
    "/category/:id",
	verifyToken,
	productController.deleteCategory
)
router.post(
    "/",
	verifyToken,
    multerUpload.single("products"),
	validateProduct.productRules,
	errorValidate,
	productController.createProduct
)
router.patch(
    "/:id",
	verifyToken,
    multerUpload.single("products"),
	validateProduct.productRules,
	errorValidate,
	productController.editProduct
)

module.exports = router;
