var express = require('express');
var router = express.Router();
var venderHelper = require('../helpers/vendor-helper')


router.get('/',(req,res)=>{
    res.render('vendor/vendor-login')
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



module.exports = router;