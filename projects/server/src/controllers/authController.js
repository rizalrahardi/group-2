"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models"); // Pastikan path ke model User sudah sesuai
const { utils } = require("../services");

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
};

module.exports = authController;
