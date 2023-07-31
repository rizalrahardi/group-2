const { body } = require("express-validator");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const loginRules = [
	body("username")
		.notEmpty()
		.withMessage("Username harus diisi")
		.custom(async (value, { req }) => {
			const user = await User.findOne({ where: { username: value } });
			if (!user) {
				throw new Error("Username salah atau tidak terdaftar");
			}
			req.user = user;
		}),
	body("password")
		.notEmpty()
		.withMessage("Password tidak boleh kosong")
		.custom(async (value, { req }) => {
			if (!req.user) {
				throw new Error("User tidak ditemukan");
			}
			const isValidPassword = await bcrypt.compare(value, req.user.password);
			if (!isValidPassword) {
				throw new Error("Password salah");
			}
		}),
];

module.exports = { loginRules };
