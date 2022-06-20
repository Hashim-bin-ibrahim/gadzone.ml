var db = require('../config/connection')
var collection = require('../config/collection')
const { resolve } = require('path')
const async = require('hbs/lib/async')
var objectId = require('mongodb').ObjectId

module.exports={
    addCatagory : (categoryData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_CATEGORY).insertOne(  {"name": categoryData.name , "isDeleted": false}).then((data)=>{
                console.log(data);
                 resolve(data.insertedId)
             })
        })
 
 

    },
    showcategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let main_category=await db.get().collection(collection.PRODUCT_CATEGORY).find({"isDeleted" : false}).toArray()
            console.log(main_category);
            resolve(main_category )
        })
    },
    deleteCategory :(userId)=>{
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.PRODUCT_CATEGORY).updateOne({_id:objectId(userId)},{$set:{ "isDeleted":true}}).then((response)=>{
                console.log(response);
                resolve(response)
            })
           
        })
},
updatecategory:(userId,userDetails)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_CATEGORY).updateOne({_id:objectId(userId)},{
            $set :{
                "name" : categoryData.name,
                
            }
        }).then((response)=>{
            resolve()
        })
    })
}
    
    
}