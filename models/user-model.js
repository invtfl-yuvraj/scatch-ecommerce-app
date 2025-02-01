const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/scatch");

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        minLength : 3,
        trim : true,
    },
    email : String,
    password : String,
    isAdmin : Boolean,
    cart : {
        type : Array,
        default : []
    },
    orders : {
        type : Array,
        default : []
    },
    contact : Number,
    picture : String
})

module.exports = mongoose.model("user" , userSchema);