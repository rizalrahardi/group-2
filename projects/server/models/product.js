"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
      })
      this.hasMany(models.CartItem, {
        foreignKey: "productId",
      })
      this.hasMany(models.TransactionItem, {
        foreignKey: "productId",
      })
		}
	}
	Product.init(
		{
			name: DataTypes.STRING,
			productImg: DataTypes.STRING,
			price: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
