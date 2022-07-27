const mongoose = require('mongoose');

require ('../config/connection')

const categorySchema = new mongoose.Schema({
    name :{
        type :String,
        required: true,
        trim: true
    },
    isBlocked :{
        type :Boolean,
        default : false
    },
    access : {
        type : Boolean,
        default :false
    },
    edit: {
        type:Boolean,
        default:false
    },
    editTo: {
        type:String,
        default:'name'
    },
    hold : {
        type : Boolean,
        default  :false,
    }
    
})

module.exports = mongoose.model("category",categorySchema)