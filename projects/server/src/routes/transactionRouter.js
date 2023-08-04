const router = require('express').Router();
const { verifyToken } = require("../middlewares/auth");
const transactionController = require("../controllers/transactionController");

router.post("/transaction", verifyToken, transactionController.createTransaction);

module.exports = router