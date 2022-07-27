const mongoose = require('mongoose');

require ('../config/connection')

const vendorSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phoneNumber : Number,
    canLogin : {
        type : Boolean,
        default : false
    },
    isBlocked:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model("Vendor",vendorSchema)