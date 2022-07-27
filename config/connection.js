const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/endlessBlooms',{
    
    useNewUrlParser:true

}).then(()=>{
    console.log('connection Successfull');

}).catch((e)=>{
    console.log(e+"no connection");
})