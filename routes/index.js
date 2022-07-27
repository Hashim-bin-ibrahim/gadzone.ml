var express = require('express');
const async = require('hbs/lib/async');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
var vendorHelper = require('../helpers/vendor-helper')
const activeCat = require('../middleWare/activeCat');
const { find } = require('../models/category');

/* GET home page. */
router.get('/', function (req, res, next) {
  const rendorData = {}
  vendorHelper.avlPro().then(async(data) => {
   let avlCat = await activeCat.availableCat(rendorData)
    rendorData.data=data
    res.render('index', rendorData);
  })

});
//user login get
router.get('/login', (req, res) => {
  if (req.session.userLoggIn) {

    res.redirect('/');
  } else
    res.render('user/user-login',{Login:true})
})

//user login post 
router.post('/', (req, res) => {
  userHelpers.userLogin(req.body).then((response) => {
    if (response) {
      res.redirect('/')
    } else {
      res.redirect('/login')  
    }
  })
})
//show product page by categories
router.get('/products/:id',async(req,res)=>{
  let proId =req.params.id
  console.log(proId+"         llloooiiiii");
  // const productData = {}
  await activeCat.proByCat(proId).then((avlpro)=>{
    res.render('user/products',avlpro)
  })

})

//user signup get
var userExists = false
router.get('/user-signup', (req, res) => {
  res.render('user/user-signup', { userExists: userExists,Login:true })
  userExists = false
})

//user signup post
router.post('/user-signup', (req, res) => {
  userHelpers.doSignup(req.body).then((userExist) => {

    if (userExist) {

      userExists = true
      res.redirect('/user-signup')
    } else {
      userExists = false
      req.session.userLogin = true
      res.render('index')
    }

  })
})

//mobiles sale page
// router.get('/mobiles',(req,res)=>{
  
//   res.render('user/mobile-cat')
// })

router.get('/logout', (req, res) => {
  req.session.adminloggedIn = false
  res.redirect('/admin')
})

//active categories to display
router.get('/actCat',(req,res)=>{
  activeCat.avlcat().then((data)=>{
    console.log(data);

  })
})





module.exports = router;
