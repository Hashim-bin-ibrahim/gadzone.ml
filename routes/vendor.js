var express = require('express');
var router = express.Router();
var vendorHelper = require('../helpers/vendor-helper')
var sms = require('../config/verify');
const { mkdirSync } = require('fs');
const { deserialize } = require('v8');


router.get('/',(req,res)=>{
  
    res.render('vendor/vendor-login')
})

router.get('/vendor-dash',(req,res)=>{
    res.render('vendor/vendor-dashboard')
})

// router.post('/vendor-dash',(req,res)=>{
//     res.render('vendor/vendor-dashboard')
// })

router.post('/vendor-dash',(req,res)=>{ 
  
    vendorHelper.vendorLogin(req.body).then((response)=>{
      
      if( response.status){
        res.redirect('/vendor/vendor-dash')
      }else{
        
        res.redirect('/vendor')
      }
      console.log(response);
        })
    
    
  })


var exist =  false
router.get('/vendor-signup',(req,res)=>{
res.render('vendor/vendor-signup',{exist:exist})
    exist = false
})

router.get('/vendor-verification',(req,res)=>{
    res.render('vendor/vendor-verification')
})

router.post('/otpVerify',(req,res)=>{
sms.otpVerify(req.body,req.session.vendorData).then((data)=>{
if(data.valid){
vendorHelper.doSignup(req.session.vendorData).then((response)=>{
console.log(response);
res.redirect('/vendor')
})
}else{
  res.redirect('/vendor/vendor-verification')
}
})
   
})

router.post('/vendor-signup',(req,res)=>{
  req.session.vendorData = req.body
sms.doSms(req.body).then((data)=>{
if(data){
  res.redirect('/vendor/vendor-verification')
}else{
  res.redirect('/vendor/vendor-signup')
}
})

 
  
})



// router.post('/vendor-signup',(req,res)=>{
//   req.session.vendorData = req.body
// vendorHelper.doSignup(req.body).then((vendorExist)=>{
// if(vendorExist){
//   exist = true
//  res.redirect('/vendor/vendor-signup')
//  console.log('signup successfull');
 
// }else{
//   res.redirect('/vendor/vendor-verification')
//   console.log('signup failed');
// }
// })
// console.log(req.body);
   
// })

router.get('/admit-vendor/:id',(req,res)=>{
    let userId = req.params.id
    
    adminHelpers.deleteCategory(vendorId).then((response)=>{
      res.redirect('/admin/dashboard')
    })
  
   
  })


  router.post('/add-products',(req,res)=>{
    //res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
     console.log(req.body)
     console.log(req.files.image)
  
     vendorHelper.addProduct(req.body,(id)=>{
       let image=req.files.image 
       
       image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
         if(!err){
           res.redirect("vendor/vendor-dash")
         }else{
           console.log(err);
  
         }
       })
     
     })
  
  })


module.exports = router;