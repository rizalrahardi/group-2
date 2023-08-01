const { Product, Category } = require("../../models");
const { Op } = require("sequelize");
const productController = {
	getProductList: async (req, res) => {
		try {
		  const { sort, price, name, categoryId, search, page, limit } = req.query;
	  
		  const currentPage = parseInt(page) || 1;
		  const itemsPerPage = parseInt(limit) || 10;
		  let orderCriteria = [];
	  
		  if (sort === "oldest") {
			orderCriteria.push(["createdAt", "ASC"]);
		  } else if (sort === "newest") {
			orderCriteria.push(["createdAt", "DESC"]);
		  } else if (price === "lowest") {
			orderCriteria.push(["price", "ASC"]);
		  } else if (price === "highest") {
			orderCriteria.push(["price", "DESC"]);
		  }
	  
		  if (name === "asc") {
			orderCriteria.push(["name", "ASC"]);
		  } else if (name === "desc") {
			orderCriteria.push(["name", "DESC"]);
		  }
	  
		  
	  
		  const whereCondition = {
			isActive: true,
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
			result: {
			  totalRows: totalCount,
			  totalPages: totalPages,
			  currentPage: currentPage,
			  itemsPerPage: itemsPerPage,
			  products: productList,
			},
		  });
		} catch (error) {
		  console.log(error);
		  return res.status(500).json({ message: "Error retrieving product list" });
		}
	  },
	  
};

module.exports = productController;
