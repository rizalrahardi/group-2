const router = require("express").Router();
const {productController} = require('../controllers');
const { verifyToken } = require("../middlewares/auth");
const { productController } = require("../controllers");
const { errorValidate } = require("../middlewares");
const { multerUpload } = require("../middlewares/multer");
const { validateProduct } = require("../services");

router.get("/", verifyToken, productController.getProductList )
module.exports = router
router.post(
    "/category",
	validateProduct.categoryRules,
	errorValidate,
	productController.createCategory
)
router.patch(
    "/category/:id",
	validateProduct.categoryRules,
	errorValidate,
	productController.editCategory
)
router.delete(
    "/category/:id",
	productController.deleteCategory
)
router.post(
    "/",
    multerUpload.single("products"),
	validateProduct.productRules,
	errorValidate,
	productController.createProduct
)
router.patch(
    "/:id",
    multerUpload.single("products"),
	validateProduct.productRules,
	errorValidate,
	productController.editProduct
)

module.exports = router;
