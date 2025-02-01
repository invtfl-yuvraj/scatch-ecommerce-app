const mongoose = require("mongoose");

mongoose
.connect("mongodb://127.0.0.1:27017/scatch")
.then(()=>{
    console.log("Mongoose Connected!!");
})
.catch((err)=>{
    console.log("Error in connecting mongoose :", err.message);
});

module.exports = mongoose.connection;