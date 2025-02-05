const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.find({ email });

    if (user != "") return res.status(502).send("User already exist");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let createdUser = await userModel.create({
            fullname,
            email,
            password,
          });

          let token = generateToken(createdUser);
          res.cookie("token", token);
          res.send("User created Sucessfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};
