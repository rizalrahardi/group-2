const router = require('express').Router();
const { verifyToken } = require("../middlewares/auth");
const transactionController = require("../controllers/transactionController");

router.post("/transaction", verifyToken, transactionController.createTransaction);
// router.get("/transaction", verifyToken, transactionController.getTransactions);
// router.get("/transaction", verifyToken, transactionController.getSalesReportByDateRange);
router.get("/transaction/coba", transactionController.getDaily)
router.get('/transaction/product', transactionController.getProductSold)
module.exports = router