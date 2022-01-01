const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
require('../config/passport');
const app = express();
app.use(passport.initialize);
app.use(passport.session());
class AuthMiddleware {
    // Validate Token Middleware || Route Protection Middleware
    static auth = (req, res, next) => {
        passport.authenticate('jwt', (err, user, info) => {
            if (err || !user) {
                res.status(401).json({
                    message: 'User is not authorized',
                    error: 'Token is expired',
                    statusCode: 400,
                });
            } else {
                req.user = user;
                next();
            }
        })(req, res, next);
    };

    static UserLogin = (req, res, next) => {
        try {
            passport.authenticate('login', function (err, user, info) {
                if (err || !user) {
                    res.status(401).json({
                        success: false,
                        message: `Error! ${info.message}`,
                    });
                } else {
                    req.user = user;
                    next();
                }
            })(req, res, next);
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = AuthMiddleware;
