
const async = require('hbs/lib/async')
const { resolve } = require('path')
var db = require('../config/connection')
const category = require('../models/category')
const product = require('../models/product')


// avalable categories
let availableCat = (rendorData)=>{
  return new Promise(async(resolve,reject)=>{
    const avlcat = await category.aggregate([
      {
        '$match': {
          'isBlocked': false
        }
      }, {
        '$lookup': {
          'from': 'products', 
          'localField': '_id', 
          'foreignField': 'category', 
          'as': 'productresult'
        }
      }, {
        '$unwind': {
          'path': '$productresult'
        }
      }, {
        '$match': {
          'productresult.isBlocked': false
        }
      }, {
        '$lookup': {
          'from': 'vendors', 
          'localField': 'productresult.createdBy', 
          'foreignField': '_id', 
          'as': 'vendorLookup'
        }
      }, {
        '$unwind': {
          'path': '$vendorLookup'
        }
      }, {
        '$match': {
          'vendorLookup.isBlocked': false
        }
      }, {
        '$group': {
          '_id': '$name'
        }
      }
    ])
    
    rendorData.avlcat=avlcat
    resolve(rendorData)
    
  
  })

  

}

// product list by corresponding category

let proByCat = (proId)=>{
  
  return new Promise(async(resolve,reject)=>{
    var response ={}
    let avlpro = await product.aggregate(
      [
        {
          '$match': {
            'isBlocked': false
          }
        }, {
          '$lookup': {
            'from': 'categories', 
            'localField': 'category', 
            'foreignField': '_id', 
            'as': 'categorylookup'
          }
        }, {
          '$unwind': {
            'path': '$categorylookup'
          }
        }, 
        {
          '$match': {
            'categorylookup.isBlocked': false
          }
        }, {
          '$lookup': {
            'from': 'vendors', 
            'localField': 'createdBy', 
            'foreignField': '_id', 
            'as': 'vendorlookup'
          }
        }, {
          '$unwind': {
            'path': '$vendorlookup'
          }
        }, {
          '$match': {
            'vendorlookup.isBlocked': false
          }
        },{
          '$match':{
            'categorylookup.name':proId
          }
        }
      ]
    )
      response.avlpro =avlpro
    resolve(response)
  
  })
}

  module.exports={availableCat,proByCat}