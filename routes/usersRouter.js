const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is users Router");
});

router.post("/register", registerUser);

module.exports = router;
