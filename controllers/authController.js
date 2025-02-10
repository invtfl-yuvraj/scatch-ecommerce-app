const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    if (!password || !email) {
      req.flash("error", "Email or Password is required");
      res.status(400);
      return res.redirect("/");
    }

    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "User already exist");
      res.status(502);
      return res.redirect("/");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          req.flash("error", err.message);
          res.status(502);
          return res.redirect("/");
        }
        let createdUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        let token = generateToken(createdUser);
        res.cookie("token", token);
        res.redirect("/shop");
      });
    });
  } catch (err) {
    req.flash("error", err.message);
    res.status(502);
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({
      email,
    });

    if (!user) {
      req.flash("error", "User not found");
      res.status(502);
      return res.redirect("/");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        req.flash("error", "Something went wrong");
        res.status(502);
        return res.redirect("/");
      }

      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        req.flash("error", "Email or password is incorrect");
        res.status(502);
        return res.redirect("/");
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    res.status(502);
    return res.redirect("/");
  }
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
