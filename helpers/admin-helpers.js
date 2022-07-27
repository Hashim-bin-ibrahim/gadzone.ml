var db = require('../config/connection')
const category = require('../models/category')
const { resolve } = require('path')
const async = require('hbs/lib/async')
const vendor = require('../models/vendor')
var objectId = require('mongodb').ObjectId

module.exports={
    // addCatagory : (categoryData)=>{
    //     return new Promise((resolve,reject)=>{
    //         db.get().collection(collection.PRODUCT_CATEGORY).insertOne(  {"name": categoryData.name , "isDeleted": false}).then((data)=>{
    //             console.log(data);
    //              resolve(data.insertedId)
    //          })
    //     })
 
 

    // },
    // showcategory:()=>{
    //     return new Promise(async(resolve,reject)=>{
    //         let main_category=await db.get().collection(collection.PRODUCT_CATEGORY).find({"isDeleted":false}).toArray()
    //         console.log(main_category);
    //         resolve(main_category )
    //     })
    // },
deleteCategory :(userId)=>{
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.PRODUCT_CATEGORY).updateOne({_id:objectId(userId)},{$set:{ "isDeleted":true}}).then((response)=>{
                console.log(response);
                resolve(response)
            })
           
        })
},
editCat:()=>{
    return new Promise(async(resolve,reject)=>{
        const availCategory = await category.aggregate([{$match:{edit:true}}])
        resolve(availCategory)

})
},
updateCat :(catId,catName)=>{
    return new Promise(async(resolve,reject)=>{
       await category.updateOne({_id:catId},{$set:{name:catName ,edit:false,editTo:"default"}}).then((response)=>{
            console.log(response);
            resolve(response)
        })
       
    })
},
showCategory :()=>{
    return new Promise(async(resolve,reject)=>{
       const availCategory = await category.aggregate([{$match:{access:false,isBlocked:false}}])

       console.log(availCategory);
       resolve(availCategory);


    })
    
},
blockCategory :(catId)=>{
    return new Promise(async(resolve,reject)=>{
       await category.updateOne({_id:objectId(catId)},{$set:{ isBlocked:true}}).then((response)=>{
            console.log(response);
            resolve(response)
        })
       
    })
},
blockVen :(catId)=>{
    return new Promise(async(resolve,reject)=>{
       await vendor.updateOne({_id:objectId(catId)},{$set:{ canLogin:false}}).then((response)=>{
            console.log(response);
            resolve(response)
        })
       
    })
},
blockedCat :()=>{
    return new Promise(async(resolve,reject)=>{
        const availCategory = await category.aggregate([{$match:{isBlocked:true,access:true}}])
 
        console.log(availCategory);
        resolve(availCategory);
 
 
     })
    
    
    
},
holdedCat :()=>{
    return new Promise(async(resolve,reject)=>{
        const availCategory = await category.aggregate([{$match:{isBlocked:true,access:false}}])
        console.log(availCategory);
        resolve(availCategory);
 
 
     })
    
    
    
},
unblockCat :(catId)=>{
    return new Promise(async(resolve,reject)=>{
       await category.updateOne({_id:objectId(catId)},{$set:{ isBlocked:false}}).then((response)=>{
            console.log(response);
            resolve(response)
        })
       
    })
},
agreeCat :(catId)=>{
    return new Promise(async(resolve,reject)=>{
       await category.updateOne({_id:objectId(catId)},{$set:{access:true,isBlocked:false}}).then((response)=>{
            
            resolve(response)
        })
       
    }) 
},
activeCategory :()=>{
    return new Promise(async(resolve,reject)=>{
       const activeCat = await category.aggregate([{$match:{access:true,isBlocked:false}}])

       console.log(activeCat);
       resolve(activeCat);


    })
    
},
holdVen :(venId)=>{
    
        return new Promise(async(resolve,reject)=>{
           await vendor.updateOne({_id:venId},{$set:{ isBlocked:true}}).then((response)=>{
                console.log(response);
                resolve(response)
            })
           
        })
    }



// updateUser:(userId,userDetails)=>{
//     return new Promise((resolve,reject)=>{
//         db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(userId)},{
//             $set :{
//                 name : userDetails.name,
//                 email : userDetails.email
//             }
//         }).then((response)=>{
//             resolve()
//         })
//     })
// }
    
    
}