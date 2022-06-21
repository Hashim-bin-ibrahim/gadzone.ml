var express = require('express');
const req = require('express/lib/request');
const adminHelpers = require('../helpers/admin-helpers');
const vendorHelpers = require('../helpers/vendor-helper')
var router = express.Router();

/* GET users listing. */

const emaildb="hashim@gmail.com";
const passworddb  = 123;
var loginErr = false;

router.get('/', function(req, res, next) {
  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
  if(req.session.adminloggedIn){
    res.redirect('/admin/dashboard');
  }else
res.render('admin/admin-login',{loginErr:loginErr});
loginErr=false;
});


// router.get('/dashboard',(req,res)=>{
//   // var abc = (adminHelpers.showcategory(),vendorHelpers.getallvendors())
//   adminHelpers.showcategory().then((data)=>{
//     console.log(data);
//     res.render('admin/admin-dashboard',{data:data})
//   })
  
// })

router.get('/dashboard',(req,res)=>{
  if(req.session.adminloggedIn){
    adminHelpers.showcategory().then((data)=>{
      vendorHelpers.getallvendors().then((vendors)=>{
        console.log(vendors);
        res.render('admin/admin-dashboard',{data:data,vendors:vendors})
      })
      
    })

  }else{
    res.redirect('/admin')
  }
  
  
})

router.post('/edit-category/:id',(req,res)=>{
  console.log(req.body)
  adminHelpers.editCategory(req.params.id,req.body)
    res.redirect('/admin/dashboard')
  

})



router.post('/dashboard', function(req, res) {
  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
  const { email,password } = req.body;
  if (email == emaildb && password == passworddb) {
     req.session.adminloggedIn=true
    res.redirect('/admin/dashboard');
    console.log('login successfull');
       
  }else{
   loginErr =true
    res.redirect("/admin")
    console.log('login error');
  }
 })


router.post('/add-category',(req,res)=>{
  adminHelpers.addCatagory(req.body)
  res.redirect('/admin/dashboard')
  console.log(req.body);
})

router.get('/delete-user/:id',(req,res)=>{
  let userId = req.params.id
  console.log('userId')
  adminHelpers.deleteCategory(userId).then((response)=>{
    res.redirect('/admin/dashboard')
  })

 
})



router.get('/admit-vendor/:id',(req,res)=>{
  let vendorId = req.params.id
  vendorHelpers.admitVendor(vendorId).then((response)=>{
    res.redirect('/admin/dashboard')
  })
})

// router.get('/edit-user/:id',async(req,res)=>{
//   let user= await userHelper.getUserDetails(req.params.id)
//    console.log(user);
//   res.render('admin/edit-user',{user})
// })

router.post('/edit-user/:id',(req,res)=>{
  adminHelpers.updatecategory(req.params.id,req.body).then(()=>{
res.redirect('/admin/users/')
  })
})


router.get('/logout', (req, res) => {

  req.session.adminloggedIn=false
  res.redirect('/admin')
})




module.exports = router;

