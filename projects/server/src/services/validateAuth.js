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
const forgotPasswordRules = [
	body("email")
	.notEmpty()
	.withMessage("Email harus diisi")
	.custom(async (value, {req}) => {
		const user = await User.findOne({ where: { email: value } });
			if (!user) {
				throw new Error("Email salah atau tidak terdaftar");
			}
			req.user = user;
	})
]
const resetPasswordRules = [
	body("password")
	.notEmpty()
	.withMessage("Password harus diisi")
	.matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*\d])(?=.*\d)(?=.*[.]).{6,}$/)
	.withMessage('Password minimal 6 characters dengan setidaknya 1 huruf besar dan 1 simbol.'),

	body("confirmPassword")
	.notEmpty()
	.withMessage("Confirm Password harus diisi")
	.custom((value, { req }) => {
		return value === req.body.password
	  })
	.withMessage("Confirm Password tidak sama")
]

module.exports = { loginRules, forgotPasswordRules, resetPasswordRules };
