const { Transaction, User, Product, TransactionItem, Category, sequelize } = require("../../models");
const { Op } = require("sequelize");
const transactionController = {
	createTransaction: async (req, res) => {
		const { items } = req.body;
		console.log("data yand dikirim frontend", items);
		try {
			const { id } = req.User;
			const user = await User.findByPk(id);
			console.log(user);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			let transaction;
			await sequelize.transaction(async (t) => {
				transaction = await Transaction.create(
					{
						userId: user.id,
						totalPrice: 0,
					},
					{ transaction: t }
				);

				let totalPrice = 0;
				for (let item of items) {
					console.log("ini for of items di server", item);
					const { productId, quantity } = item;
					const product = await Product.findByPk(productId, { transaction: t });
					if (!product) {
						return res.status(404).json({ message: 'Product not found' });
					}
					const price = product.price * quantity;
					await TransactionItem.create(
						{
							productId,
							transactionId: transaction.id,
							quantity,
							price,
						},
						{ transaction: t }
					);
					totalPrice += price;
				}
				await transaction.update({ totalPrice }, { transaction: t });
			});

			return res.status(201).json({ message: 'Transaction created successfully', data: transaction });
		} catch (error) {
			console.error("ini erorrrrroooorr", error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
	getDaily: async (req, res) => {
		try {
			const { startDate, endDate } = req.query;

			const dailySales = await Transaction.findAll({
				where: {
					createdAt: {
						[Op.between]: [new Date(startDate), new Date(endDate)],
					},
				},
				attributes: [
					[sequelize.fn('date', sequelize.col('createdAt')), 'transactionDate'],
					[sequelize.fn('sum', sequelize.col('totalPrice')), 'totalPrice'],
				],
				group: [sequelize.fn('date', sequelize.col('createdAt'))],
			});

			return res.status(200).json({ data: dailySales });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error.message });
		}
	},

	getProductSold: async (req, res) => {
		try {
			const { startDate, endDate } = req.query;
			const productSold = await TransactionItem.findAll({
				include: [
					{
						model: Transaction,
						where: {
							createdAt: {
								[Op.between]: [new Date(startDate), new Date(endDate)],
							},
						},
					},
					{ model: Product },
				],
				attributes: [
					'productId',
					[sequelize.fn('sum', sequelize.col('transactionitem.quantity')), 'totalQuantity'],
				],
				group: ['productId', 'Transaction.id'],
			});

			return res.status(200).json({ productSold });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error.message });
		}
	},
	getTransaction: async (req, res) => {
		try {
			const transaction = await Transaction.findAll({
				include: [
					{ model: User },
				],
			})
			return res.status(200).json({ data: transaction });
		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	},
	getTransactionById: async (req, res) => {
		try {
			const id = req.params.id;
			const transactionItem = await TransactionItem.findAll({
				where: {
					transactionId: id,
				},
				include: [
					{ model: Product },
				]
			})
			return res.status(200).json({ data: transactionItem });
		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	}

};

module.exports = transactionController;
