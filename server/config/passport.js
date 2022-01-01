const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database/connections');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((userID, done) => {
    const user = User.findOne({ where: { id: userID } });
    if (user) {
        done(null, user);
    } else {
        done('Error');
    }
});

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
};

const verifyLoginCallback = (username, password, done) => {
    User.findOne({
        where: { email: username },
    })
        .then(async (user) => {
            if (!user) {
                return done(null, false, {
                    message: 'User does not Exist!',
                });
            }
            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordCorrect) {
                return done(null, false, {
                    message: 'Incorrect password!',
                });
            } else {
                return done(null, user);
            }
        })
        .catch((error) => {
            done(null, false, {
                message: 'Something went wrong',
            });
        });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ where: { id: jwt_payload.id } })
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => {
                return done(err, false);
            });
    })
);

const strategy = new LocalStrategy(customFields, verifyLoginCallback);

passport.use('login', strategy);
