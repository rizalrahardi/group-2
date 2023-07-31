const { User, sequelize } = require("../../models");
const { hashedPassword } = require("../services/utils");
const fs = require("fs");
const userController = {
	createCashier: async (req, res) => {
		try {
			const { username, email, password, role, isActive } = req.body;
			const hassPass = hashedPassword(password);
			await sequelize.transaction(async (t) => {
				const user = await User.create(
					{
						username,
						email,
						password: hassPass,
						role,
						isActive,
					},
					{ transaction: t }
				);
				return res.status(200).json({
					message: "User created successfully",
					cashier: user,
				});
			});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},

	updateCashier: async (req, res) => {
		try {
			const { id } = req.params;
			const { username, email, password, role, isActive } = req.body;
			const user = await User.findByPk(id);
			const hassPass = password ? hashedPassword(password) : user.password;
			await sequelize.transaction(async (t) => {
				const user = await User.update(
					{
						username,
						email,
						password: hassPass,
						role,
						isActive,
					},
					{ where: { id }, transaction: t }
				);
				return res.status(200).json({
					message: "User updated successfully",
					cashier: user,
				});
			});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},

	// deactivateCashier: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		console.log(id);
	// 		const { isActive } = req.body;
	// 		await sequelize.transaction(async (t) => {
	// 			const user = await User.update(
	// 				{
	// 					isActive,
	// 				},
	// 				{ where: { id }, transaction: t }
	// 			);
	// 			return res.status(200).json({
	// 				message: "User updated successfully",
	// 				cashier: user,
	// 			});
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 		return res.status(500).json({ message: error.message });
	// 	}
	// },

	changeAvatarCashier: async (req, res) => {
		try {
			const { id } = req.User;
			const user = await User.findByPk(id);
			const oldAvatar = user.imgProfile;
			if (oldAvatar) {
				fs.unlinkSync(oldAvatar);
			}
			await sequelize.transaction(async (t) => {
				await User.update(
					{
						imgProfile: req.file.path,
					},
					{ where: { id: id } },
					{ transaction: t }
				);
				const user = await User.findByPk(id);
				return res.status(200).json({
					message: "Avatar berhasil diubah",
					user,
				});
			});
		} catch (error) {
			return res.status(500).json({ message: "Terjadi kesalahan pada server" });
		}
	},
};

module.exports = userController;
