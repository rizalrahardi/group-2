const router = require('express').Router();
const { verifyToken, isCashier } = require("../middlewares/auth");
const transactionController = require("../controllers/transactionController");

router.post("/transaction", verifyToken, isCashier, transactionController.createTransaction);
// router.get("/transaction", verifyToken, transactionController.getTransactions);
// router.get("/transaction", verifyToken, transactionController.getSalesReportByDateRange);
router.get("/transaction", transactionController.getDaily)
router.get('/transaction/product', transactionController.getProductSold)
module.exports = router