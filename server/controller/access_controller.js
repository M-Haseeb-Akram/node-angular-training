const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { UserLogin } = require('../middleware/express_validator');

const app = express();
app.use(bodyParser.json());

module.exports = {
    UserRegister: async (req, res) => {
        try {
            const { name, email, password, confirmPassword } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const new_user = await User.create({
                email: email,
                name: name,
                password: hash,
            });
            res.status(201).json({
                success: true,
                message: { new_user },
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'while adding!',
            });
        }
    },
    test: async (req, res) => {
        try {
            console.log(req.user.id);
            res.status(201).json({
                success: true,
                message: { mmsg: 'Hello' },
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'while adding!',
            });
        }
    },

    UserLogin: async (req, res) => {
        try {
            const token = jwt.sign({ id: req.user.id }, 'secret', {
                expiresIn: '1h',
            });
            res.status(200).json({
                user: req.user,
                accessToken: `Bearer ${token}`,
                statusCode: 200,
            });
        } catch (error) {
            res.status(400).json({
                message: `Error! ${error}`,
                statusCode: 400,
            });
        }
    },
};
