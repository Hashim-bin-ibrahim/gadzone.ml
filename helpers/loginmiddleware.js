var admin = require('../routes/admin')

var admins= (req,res,next)=>{
 if(req.session.adminloggedIn){
     next()
 }else{
     res.redirect('/admin')
 }
}