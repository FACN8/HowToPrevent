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
    bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
        const { name, email } = req.body
        console.log(req.body)
        if (err) {
            return res.render('register', {
                activePage: { register: true },
                error: error.message
            });
        }

        try {
            await addNewUser(name, email, hash)

            res.redirect('/')
        } catch (error) {

            res.render('register', {
                activePage: { register: true },
                error: error.message
            })

        }
    });


exports.authenticate = async(req, res) => {
    try {
        const { password, name } = req.body;

        const user = await findByUsername(name);

        bcrypt.compare(password, user.password, function(err, result) {
            if (!result) {
                return res.render('/home', {
                    activePage: { login: true },
                    error: 'Password is incorrect'
                });
            }

            jwt.sign(user.name, process.env.JWT_SECRET, function(err, token) {
                if (err) {
                    res.render('/home', {
                        activePage: { login: true },
                        error: err.message
                    });
                }

                res.cookie('access_token', token);
                res.redirect('/');
            });
        });
    } catch (error) {
        res.render('/home', {
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