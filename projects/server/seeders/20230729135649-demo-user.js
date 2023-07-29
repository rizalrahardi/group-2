"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert("Users", [
			{
				username: "admin",
				email: "admin@gmail.com",
				password:
					"$2a$12$P2y3lhfjvS8SKvREabIB.uK5tHTg8sMQWejAYYkKqTG2IapWoUsVu",
				role: "admin",
				isActive: true,
				imgProfile: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "cashier",
				email: "cashier@gmail.com",
				password:
					"$2a$12$QFOoXx16pkKb.K10/n3rJe6HFlSXi5T3Dq2m2EYH9K6OPnXFc4Ema",
				role: "cashier",
				isActive: true,
				imgProfile: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
