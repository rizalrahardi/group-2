const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter")

const hashedPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "24h" });
};

const decodeToken = (token) => {
	return jwt.verify(token, process.env.JWT_KEY);
};

const comparePasswords = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

const sendForgotPasswordMail = async (email, token) => {
	return transporter.sendMail(
		{
			from: "Profile Info Mailer <profile@mailer.com>",
			to: email,
			subject: "Reset Password",
			text: `Please click the following link to reset your password: ${process.env.WHITELISTED_DOMAIN}/reset-password/${token}`
		}
	)
}

module.exports = {
	comparePasswords,
	generateToken,
	decodeToken,
	hashedPassword,
	sendForgotPasswordMail
};
