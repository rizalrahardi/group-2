const router = require("express").Router();
const {productController} = require('../controllers');
const { verifyToken } = require("../middlewares/auth");
router.get("/", verifyToken, productController.getProductList )
module.exports = router