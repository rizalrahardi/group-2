const { body } = require("express-validator");
const { User } = require('../../models')
const bcrypt = require("bcrypt");

const CreateCashierRules = [
    body("username")
        .notEmpty()
        .withMessage("Username harus diisi")
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
                throw new Error("Username sudah terdaftar gunakan username lain");
            }
            req.user = user;
        }),
    body("password")
        .notEmpty()
        .withMessage("Password tidak boleh kosong"),
    body("email")
        .notEmpty()
        .withMessage("Email tidak boleh kosong")
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error("Email sudah terdaftar gunakan email lain");
            }
            req.user = user;
        }),
    body("role")
        .notEmpty()
        .withMessage("Role tidak boleh kosong"),
    body("isActive")
        .notEmpty()
        .withMessage("Active tidak boleh kosong"),

]

module.exports = {
    CreateCashierRules
}