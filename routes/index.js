const express = require("express");
const userModel = require("../models/user-model");

const router = express.Router();

router.get("/" , (req, res)=>{
    res.render("index");
})

module.exports = router;