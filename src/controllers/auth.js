const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { findByUsername, addNewUser, addProfile, getProfile } = require("../models/users/user.model");

exports.homePage = (req, res) => {
    res.render("home", { activePage: { home: true } });
};
exports.registerPage = (req, res) => {
    res.render("register", { activePage: { register: true } });
};


exports.addUser = (req, res, err) =>
    bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
        const { name, email } = req.body
        if (err) {
            return res.render('register', {
                activePage: { register: true },
                error: "User Created"
            });
        }

        try {
            await addNewUser(name, email, hash)
            const userData = await findByUsername(name);
            await addProfile(userData[0].id);
            res.redirect('/')

        } catch (error) {
            console.log(error)
            res.render('register', {
                activePage: { register: true },
                error: "Did Not Create User"
            })

        }
    });


exports.authenticate = async(req, res) => {
    try {
        const { password, name } = req.body;
        const userData = await findByUsername(name);
        const profileData = await getProfile(userData[0].id)
        const allUserData = { userData: userData[0], profileData: profileData[0] };

        bcrypt.compare(password, userData[0].password, function(err, result) {
            if (!result) {
                return res.render('home', {
                    activePage: { login: true },
                    error: 'Password is incorrect'
                });
            }

            jwt.sign(allUserData, process.env.JWT_SECRET, function(err, token) {
                if (err) {
                    res.render('home', {
                        activePage: { login: true },
                        error: "Password is Incorrect"
                    });
                }

                res.cookie('user_access', token);
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
    res.clearCookie('user_access');

    res.redirect('/');

    next();
};