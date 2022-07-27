const mongoose = require('mongoose');

require ('../config/connection')

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phoneNumber : Number,
    canLogin : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model("User",userSchema)