const { Product, Category } = require("../../models");
const { Op } = require("sequelize");
const productController = {
	getProductList: async (req, res) => {
		try {
			const { sort, price, name, category, search } = req.query;

			let orderCriteria = [];

			if (sort === "oldest") {
				orderCriteria.push(["createdAt", "ASC"]);
			} else if (sort === "newest") {
				orderCriteria.push(["createdAt", "DESC"]);
			}

			if (price === "lowest") {
				orderCriteria.push(["price", "ASC"]);
			} else if (price === "highest") {
				orderCriteria.push(["price", "DESC"]);
			}

			if (name === "ascending") {
				orderCriteria.push(["name", "ASC"]);
			} else if (name === "descending") {
				orderCriteria.push(["name", "DESC"]);
			}

			if (category) {
				const categoryInfo = await Category.findOne({
					where: { id: category },
					attributes: ["id"],
				});

				if (categoryInfo) {
					orderCriteria.push(["categoryId", "ASC"]);
				}
			}

			if (orderCriteria.length === 0) {
				orderCriteria.push(["createdAt", "DESC"]);
			}

			const whereCondition = {
				isActive: true,
			};

			if (search) {
				whereCondition.name = {
					[Op.iLike]: `%${search}%`,
				};
			}

			const productList = await Product.findAll({
				where: whereCondition,
				order: orderCriteria,
				include: [{ model: Category, as: "Category", required: false }],
			});

			return res.status(200).json({
				message: "Product list retrieved successfully",
				products: productList,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Error retrieving product list" });
		}
	},
    allProducts: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving product list" });
        }
    }
};

module.exports = productController;
