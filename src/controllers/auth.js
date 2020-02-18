const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { findByUsername, addNewUser } = require("../models/users/user.model");

exports.homePage = (req, res) => {
    res.render("home", { activePage: { home: true } });
};
exports.registerPage = (req, res) => {
    res.render("register", { activePage: { register: true } });
};


exports.addUser = (req, res, err) =>
    bcrypt.hash(password, 10, async(err, hash) => {
        if (err) {
            return res.render('register', {
                activePage: { register: true },
                error: error.message
            });
        }

        try {
            await addNewUser(username, hash)

            res.redirect('/login')
        } catch (error) {

            res.render('register', {
                activePage: { register: true },
                error: error.message
            })

        }
    });


exports.authenticate = async(req, res) => {
    try {
        const { password, username } = req.bodu;

        const user = await findByUsername(username);

        bcrypt.compare(password, user.password, function(err, result) {
            if (!result) {
                return res.render('login', {
                    activePage: { login: true },
                    error: 'Password is incorrect'
                });
            }

            jwt.sign(user.username, process.env.JWT_SECRET, function(err, token) {
                if (err) {
                    res.render('login', {
                        activePage: { login: true },
                        error: err.message
                    });
                }

                res.cookie('access_token', token);
                res.redirect('/');
            });
        });
    } catch (error) {
        res.render('login', {
            activePage: { login: true },
            error: error.message
        });
    }
};

exports.logout = (req, res, next) => {
    res.clearCookie('access_token');

    res.redirect('/');

    next();
};