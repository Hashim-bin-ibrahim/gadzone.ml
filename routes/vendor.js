var express = require('express');
var router = express.Router();
var venderHelper = require('../helpers/vendor-helper')


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
  
    venderHelper.vendorLogin(req.body).then((response)=>{
      
      if( response.status){
        res.redirect('/vendor/vendor-dash')
      }else{
        
        res.redirect('/vendor')
      }
      console.log(response);
        })
    
    
  })









router.get('/vendor-signup',(req,res)=>{
    res.render('vendor/vendor-signup')
})

router.get('/vendor-verification',(req,res)=>{
    res.render('vendor/vendor-verification')
})

router.post('/vendor-verification',(req,res)=>{
    res.render('vendor/vendor-verification')
})

router.post('/vendor-signup',(req,res)=>{
venderHelper.doSignup(req.body)
console.log(req.body);

    res.redirect('/vendor')
})

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
  
     venderHelper.addProduct(req.body,(id)=>{
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