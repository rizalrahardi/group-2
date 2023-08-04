const {
	Transaction,
	User,
	Product,
	Category,
	Cart,
	CartItem,
	TransactionItem,
	sequelize
} = require("../../models");

const transactionController = {
	createTransaction: async (req, res) => {
		try {
			const { id } = req.User
			console.log(id)
			const { totalPrice } = req.body
			console.log("3", totalPrice)
			await sequelize.transaction(async (t) => {
				const transactionCreate = await Transaction.create({
					userId: id,
					totalPrice,
				}, { transaction: t })
			})
			return res.status(200).json({ message: "Success" })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: "Failed", error: error.message })
		}
	}
};

module.exports = transactionController;
