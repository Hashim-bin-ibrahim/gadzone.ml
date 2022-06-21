var db = require('../config/connection')
var collection = require('../config/collection')

module.exports = {
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let product=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(product )
        })
    }
}