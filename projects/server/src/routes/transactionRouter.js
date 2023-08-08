const router = require('express').Router();
const { verifyToken, isCashier } = require("../middlewares/auth");
const transactionController = require("../controllers/transactionController");

router.post("/transaction", verifyToken, isCashier, transactionController.createTransaction);
router.get("/transaction", verifyToken, transactionController.getDaily)
router.get('/transaction/product', verifyToken, transactionController.getProductSold)
router.get('/transaction/all', transactionController.getTransaction)
router.get('/transaction/:id', transactionController.getTransactionById)
module.exports = router