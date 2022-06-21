var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
userHelpers.getAllProducts().then((products)=>{
  res.render('user/user-LP');
})
  
});



module.exports = router;
