const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
    register: async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword } = req.body;
            const isEmailExist = await User.findOne({
                where: { email: email },
            });
            if (isEmailExist) {
                res.status(500).json({
                    success: false,
                    message: 'Email already Exist!',
                });
            } else if (
                name.length == 0 ||
                email.length == 0 ||
                password.length == 0
            ) {
                res.status(500).json({
                    success: false,
                    message: 'All fields must be filled',
                });
            } else if (password != confirmPassword) {
                res.status(500).json({
                    success: false,
                    message: 'Password does not match!',
                });
            } else if (password.length <= 5) {
                res.status(500).json({
                    success: false,
                    message: 'Password must be of length 6!',
                });
            } else if (!validateEmail(email)) {
                res.status(500).json({
                    success: false,
                    message: 'Email is not valid!',
                });
            } else {
                next();
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error! ${error}`,
            });
        }
    },
};

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
