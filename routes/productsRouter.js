const express = require("express");

const router = express.Router();

router.get("/" , (req, res)=>{
    res.send("This is products Router");
})

module.exports = router;