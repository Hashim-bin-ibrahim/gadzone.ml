
const multer = require('multer')

//set storage 
const storage =  multer.diskStorage({
     destination : function (req,file,cb){
         cb(null,'public/productimages')
     },
     filename :function(req,file,cb){
         var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
         cb(null,this.filename+'-'+Date.now()+ext)
     }
 })

 module.exports = Store = multer({storage:storage})