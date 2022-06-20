var db = require('../config/connection')
var collection = require('../config/collection')
const { resolve } = require('path')
const async = require('hbs/lib/async')
var objectId = require('mongodb').ObjectId
var bcrypt = require ('bcrypt')

module.exports ={

    doSignup :(vendorData)=>{
        return new Promise(async(resolve,reject)=>
        {
            
             vendorData.password = await bcrypt.hash(vendorData.password,10)
            db.get().collection(collection.VENDOR_COLLECTION ).insertOne(vendorData).then((data)=>{
                console.log(data)
                resolve(data.insertedId)
               
            })
            console.log(vendorData);
          
          })
      

    },
    getallvendors:()=>{
        return new Promise(async(resolve,reject)=>{
            let users=await db.get().collection(collection.VENDOR_COLLECTION ).find().toArray()
            resolve(users )
        })
    }

}