const { body } = require("express-validator");
const { Product } = require("../../models");
const { Category } = require("../../models");

const categoryRules = [
	body("name")
		.notEmpty()
		.withMessage("Category harus diisi")
    .custom(async (value, { req }) => {
      const user = await Category.findOne({ where: { name: value } });
      if (user) {
          throw new Error("Category sudah ada");
      }
      req.user = user;
  })
        
];

const productRules = [
    body("name")
		.notEmpty()
		.withMessage("Nama Produk harus diisi"),

    body("price")
		.notEmpty()
		.withMessage("Harga harus diisi"),

    body("categoryId")
		.notEmpty()
		.withMessage("Category harus diisi")
]

module.exports = {categoryRules, productRules}