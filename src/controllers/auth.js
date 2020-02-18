const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { findByUsername, addNewUser } = require("../models/users/User.model");

exports.homePage = (req, res) => {
  res.render("home", { activePage: { home: true } });
};
exports.registerPage = (req, res) => {
  res.render("register", { activePage: { register: true } });
};


exports.addUser = (req, res, err) => {
  const {password, confirmPassword, username} = req.body
  if (password === confirmPassword) {
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      try {
        await addNewUser(username, hash);

        res.render("home", { activePage: { home: true } });
      } catch (e) {
        res.render("register", {
          activePage: { register: true },
          errorMsg: "User already registered"
        });
      }
    });
  } else {
    res.render("register", {
      activePage: { register: true },
      errorMsg: "Password do not match"
    });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const user = await findByUsername(req.body.username);
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (err) {
        res.render("home", {
          activePage: { home: true },
          errorMsg: "Password is wrong"
        });
      }
      const userInformation = {
        userId: user.id,
        userName: user.username,
        access_token: true
      };
      jwt.sign(userInformation, process.env.JWT_SECRET, function(err, token) {
        if (err) {
          res.render("home", {
            activePage: { home: true },
            errorMsg: "Error in our server,please contact the owner"
          });
        }
        res.cookie("data", token, { HttpOnly: true });
        res.redirect("/game");
      });
    });
  } catch (error) {
    res.render("home", {
      activePage: { home: true },
      errorMsg: "Username not found"
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("data");
  res.redirect("/");
};
