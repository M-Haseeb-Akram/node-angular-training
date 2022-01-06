const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-parser');
const { body, check, validationResult } = require('express-validator');
const app = express();
app.use(express.json());

class MiddlewareValidator {
    static validateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    };
    static UserRegister = () => {
        return [
            check('name')
                .isLength({ min: 5 })
                .withMessage('Username must be at least 5 characters')
                .matches(/^[a-zA-Z]+$/)
                .withMessage('Only Characters aer allowed!'),
            check('email').isEmail().withMessage('Valid Email is Required'),
            body('email')
                .custom(async (email) => {
                    const isNewEmail = await User.findOne({
                        where: { email: email },
                    });
                    if (isNewEmail) {
                        return false;
                    } else {
                        return true;
                    }
                })
                .withMessage('Email already Exist'),
            check('password')
                .isLength({ min: 5 })
                .withMessage('Password must be of length > 5'),
            body('confirmPassword')
                .custom((confirmPassword, { req }) => {
                    if (req.body.password === confirmPassword) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .withMessage('Password does not match'),
        ];
    };

    static UserLogin = () => {
        return [
            check('email').isEmail().withMessage('Valid Email is Required'),
            check('password').notEmpty().withMessage('Password is required'),
        ];
    };

    static ItemValidity = () => {
        return [
            check('title')
                .notEmpty()
                .withMessage('Item Title is required')
                .matches(/^[a-zA-Z]+$/)
                .withMessage('Item can have only characters!'),
        ];
    };
}

module.exports = MiddlewareValidator;
