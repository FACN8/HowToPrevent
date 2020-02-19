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
            console.log(error)
            res.render('register', {
                activePage: { register: true },
                error: error.message
            })

        }
    });


exports.authenticate = async(req, res) => {
    try {
        const { password, name } = req.body;
        const userData = await findByUsername(name);

        bcrypt.compare(password, userData[0].password, function(err, result) {
            if (!result) {
                return res.render('home', {
                    activePage: { login: true },
                    error: 'Password is incorrect'
                });
            }

            jwt.sign(userData[0], process.env.JWT_SECRET, function(err, token) {
                if (err) {
                    res.render('home', {
                        activePage: { login: true },
                        error: "Password is Incorrect"
                    });
                }

                res.cookie('access_token', token);
                res.redirect('/game');
            });
        });
    } catch (error) {
        res.render('home', {
            activePage: { login: true },
            error: "User Name Not Found"
        });
    }
};

exports.logout = (req, res, next) => {
    res.clearCookie('access_token');

    res.redirect('/');

    next();
};