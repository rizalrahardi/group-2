const { Transaction, User, Product, TransactionItem, Category, sequelize } = require("../../models");
const { Op } = require("sequelize");
const transactionController = {
	createTransaction: async (req, res) => {
		const { items } = req.body;

		console.log("data yand dikirim frontend", items);
		try {
			// Cek apakah userId ada dalam database
			const { id } = req.User;
			const user = await User.findByPk(id);
			console.log(user);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			// Mulai transaksi dalam transaksi database
			let transaction;
			await sequelize.transaction(async (t) => {
				transaction = await Transaction.create(
					{
						userId: user.id,
						totalPrice: 0, // Kita set sementara totalPrice ke 0, nanti akan diupdate setelah menambahkan item
					},
					{ transaction: t }
				);

				let totalPrice = 0;
				for (let item of items) {
					console.log("ini for of items di server", item);
					const { productId, quantity } = item;

					// Cek apakah productId ada dalam database
					const product = await Product.findByPk(productId, { transaction: t });
					if (!product) {
						return res.status(404).json({ message: 'Product not found' });
					}

					// Hitung total harga untuk item saat ini
					const price = product.price * quantity;

					// Buat transaksi item dalam database
					await TransactionItem.create(
						{
							productId,
							transactionId: transaction.id,
							quantity,
							price,
						},
						{ transaction: t }
					);

					// Tambahkan harga item saat ini ke total harga
					totalPrice += price;
				}

				// Update total harga pada transaksi
				await transaction.update({ totalPrice }, { transaction: t });
			});

			return res.status(201).json({ message: 'Transaction created successfully', data: transaction });
		} catch (error) {
			console.error("ini erorrrrroooorr", error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
	getTransactions: async (req, res) => {
		try {
			// Ambil semua transaksi dari database dan sertakan data terkait
			const transactions = await Transaction.findAll({
				exclude: ['userId'],
				include: [
					{
						model: User,
						attributes: ['id', 'username'],
					},
					{
						model: TransactionItem,
						include: [
							{
								model: Product,
								attributes: ['id', 'name', 'price'],
								include: [
									{
										model: Category,
										attributes: ['id', 'name'],
									}
								]
							},
						],
					},
				],
			});

			// Jika tidak ada transaksi, kirimkan respons kosong
			if (!transactions || transactions.length === 0) {
				return res.status(200).json({ message: 'No transactions found', data: [] });
			}

			return res.status(200).json({ message: 'Success', data: transactions });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
	getSalesReportByDateRange: async (req, res) => {
		const isValidDate = (dateString) => {
			const regExp = /^\d{4}-\d{2}-\d{2}$/;
			if (!dateString.match(regExp)) return false;
			const date = new Date(dateString);
			return date instanceof Date && !isNaN(date);
		};
		try {
			const { startDate, endDate } = req.query;
			if (!isValidDate(startDate) || !isValidDate(endDate)) {
				return res.status(400).json({ message: 'Invalid date format. Use "YYYY-MM-DD" format for startDate and endDate.' });
			}
			// Konversi tanggal ke format UTC
			const startUTCDate = new Date(startDate).toISOString();
			const endUTCDate = new Date(endDate).toISOString();

			// Ambil semua transaksi dari database dan sertakan data terkait
			const transactions = await Transaction.findAll({
				where: {
					[Op.or]: [
						{
							createdAt: {
								[Op.between]: [startUTCDate, endUTCDate],
							},
						},
						{
							createdAt: startUTCDate,
						},
					],
				},
				include: [
					{
						model: User,
						attributes: ['id', 'username'],
					},
					{
						model: TransactionItem, // Pastikan sudah melakukan include pada TransactionItem
						include: [
							{
								model: Product,
								attributes: ['id', 'name', 'price'],
							},
						],
					},
				],
				subQuery: false,
			});
			// Menghitung total harga transaksi harian
			const dailyTransactionTotal = transactions.reduce((result, transaction) => {
				const date = new Date(transaction.createdAt).toISOString().slice(0, 10);

				// Inisialisasi total harga untuk transaksi harian
				let totalPrice = 0;

				// Loop melalui setiap item dalam transaction.TransactionItems
				for (const item of transaction.TransactionItems) {
					totalPrice += item.price;
				}

				// Cek apakah tanggal sudah ada dalam hasil akumulasi atau belum
				if (!result[date]) {
					result[date] = {
						date,
						total: totalPrice,
					};
				} else {
					result[date].total += totalPrice;
				}

				return result;
			}, {});


			return res.status(200).json({ message: 'Success', data: transactions, dailyTransactionTotal });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	},

};

module.exports = transactionController;
