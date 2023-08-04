const { Product, Category, sequelize } = require("../../models");
const { Op } = require("sequelize");
const fs = require("fs");
const productController = {
	getProductList: async (req, res) => {
		try {
			const { sort, price, name, categoryId, search, page, limit } = req.query;
			const orderBy = (field, order) => {
				return order === "desc" ? [field, "DESC"] : [field, "ASC"];
			};
			const currentPage = parseInt(page) || 1;
			const itemsPerPage = parseInt(limit) || 10;

			let orderCriteria = [];
			if (sort) {
				orderCriteria.push(orderBy("createdAt", sort));
			} else if (price) {
				orderCriteria.push(orderBy("price", price));
			} else if (name) {
				orderCriteria.push(orderBy("name", name));
			} else {
				orderCriteria.push(orderBy("createdAt", "desc"));
			}

			const whereCondition = {
				// isActive: true,
			};

			if (search) {
				whereCondition.name = {
					[Op.like]: `%${search}%`,
				};
			}

			if (categoryId) whereCondition.categoryId = categoryId;

			const totalCount = await Product.count({
				where: whereCondition,
			});

			const totalPages = Math.ceil(totalCount / itemsPerPage);

			const productList = await Product.findAll({
				where: whereCondition,
				order: orderCriteria,
				include: [{ model: Category }],
				offset: (currentPage - 1) * itemsPerPage,
				limit: itemsPerPage,
			});

			return res.status(200).json({
				message: "Product list retrieved successfully",
				totalRows: totalCount,
				totalPages: totalPages,
				currentPage: currentPage,
				itemsPerPage: itemsPerPage,
				products: productList,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Error retrieving product list" });
		}
	},

	getCategory: async (req, res) => {
		try {
			const result = await Category.findAll()
			return res.status(200).json({
				message: "Category list retrieved successfully",
				result
			})
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Error retrieving category list" });
		}
	},
	createCategory: async (req, res) => {
		const { name } = req.body

		try {
			await sequelize.transaction(async (t) => {
				const result = await Category.create({
					name: name
				}, { transaction: t })
				console.log(result)
				return res.status(200).json({
					message: "Product's Category successfully created!"
				})
			})


		} catch (error) {
			console.log(error)
			return res.status(500).json({
				message: error.message
			})
		}
	},
	editCategory: async (req, res) => {
		const { name } = req.body
		try {
			await sequelize.transaction(async (t) => {
				const result = await Category.update({
					name
				}, {
					where: { id: req.params.id }
				}, { transaction: t })

				return res.status(200).json({
					message: "Product's Category successfully changed!"
				})
			})
		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	},
	deleteCategory: async (req, res) => {
		try {
			await sequelize.transaction(async (t) => {

				const result = await Product.update({
					isActive: false,
				},
					{
						where: {
							categoryId: req.params.id
						}
					})
				Category.destroy({
					where: { id: req.params.id }
				}, { transaction: t })

				return res.status(200).json({
					message: "Product's Category successfully deleted."
				})
			})

		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	},
	createProduct: async (req, res) => {
		try {
			const { name, price, quantity, categoryId, isActive } = req.body
			const productImg = req.file.path

			await sequelize.transaction(async (t) => {
				const result = await Product.create({
					name,
					price,
					quantity,
					categoryId,
					productImg: productImg,
					isActive
				}, { transaction: t })

				return res.status(200).json({
					message: "Product successfully created!",
					data: result
				})
			})
		}
		catch (error) {
			console.log(error)
			return res.status(500).json({
				message: error.message
			})
		}
	},
	editProduct: async (req, res) => {
		try {
			const id = req.params.id;
			const product = await Product.findByPk(id);
			const { name, price, quantity, categoryId, isActive } = req.body;
			let updateData = {
				name: name,
				price: price,
				quantity: quantity,
				categoryId: categoryId,
				isActive: isActive
			};
			if (req.file && req.file.path) {
				updateData.productImg = req.file.path;
			}
			if (product.productImg && fs.existsSync(product.productImg)) {
				fs.unlinkSync(product.productImg);
			}

			await sequelize.transaction(async (t) => {
				const result = await Product.update(
					updateData,
					{
						where: {
							id: id
						}
					},
					{ transaction: t }
				);
				return res.status(200).json({
					message: "Product successfully updated!",
					data: updateData
				});
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message
			});
		}
	},

	deleteProduct: async (req, res) => {
		try {
			await sequelize.transaction(async (t) => {
				const result = await Product.update({
					isActive: false,
				},
					{
						where: {
							id: req.params.id
						}
					}, { transaction: t })
				return res.status(200).json({
					message: "Product successfully updated."

				})
			})
		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	}
};

module.exports = productController;