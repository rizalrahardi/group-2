"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../../models"); // Pastikan path ke model User sudah sesuai
const { utils } = require("../services");
const { decodeToken, hashedPassword } = require("../services/utils");
const { where } = require("sequelize");

const authController = {
	login: async (req, res) => {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ where: { username } });
			const token = await utils.generateToken(user.id);
			return res.status(200).json({ message: "Login successful", user, token });
		} catch (error) {
			console.error("Error during login:", error);
			return res.status(500).json({ message: "Internal server error" });
		}
	},
	getUserLogin: async (req, res) => {
		const { id } = req.User;
		console.log(id);
		try {
			const user = await User.findByPk(id);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			return res.status(200).json({ message: "user data", user });
		} catch (error) {
			console.error(`Error while fetching user with ID ${id}:`, error);
			return res.status(500).json({ message: "Internal server error" });
		}
	},
	forgotPassword: async (req, res) => {
		try{
			const { email } = req.body
			const user = await User.findOne({ where: { email } })
			const token = await utils.generateToken(user.id)
			
			await sequelize.transaction(async (t) => {
				const result = await utils.sendForgotPasswordMail(email, token)
				
				return res.status(200).json({ message: "Please check your email to reset your password", data: result }),
				{ transaction: t }
			})

		} catch(error){
			return res.status(500).json(error.message)
		}
	},
	resetPassword: async (req, res) => {
		try{
			const {password, confirmPassword} = req.body
			const token = req.headers.authorization.split(" ")[1]
			const user = decodeToken(token)
			const hashedPassword = await utils.hashedPassword(password)

			await sequelize.transaction(async(t) => {
				const result = await User.update(
					{password: hashedPassword},
					{where: {id: user.id}}
				)

				return res.status(200).json({ message: 'Password successfully changed.' }),
				{transaction: t}
			})

		}catch(error){
			return res.status(500).json(error.message)
		}
	}

};

module.exports = authController;
