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
            const exist =await db.get().collection(collection.VENDOR_COLLECTION ).findOne({email:vendorData.email})
            if(exist){
                var vendorExist =true
        
                
                resolve(vendorExist)
            }else{
                vendorData.password = await bcrypt.hash(vendorData.password,10)
                db.get().collection(collection.VENDOR_COLLECTION ).insertOne({'name':vendorData.name,'email':vendorData.email,'password':vendorData.password,"canLogin":"false"}).then((data)=>{
                    var vendorExist =false
                    resolve(vendorExist)

            })
            
        }
            
               
                        
          
          
        })
      

    },
    getallvendors:()=>{
        return new Promise(async(resolve,reject)=>{
            let users=await db.get().collection(collection.VENDOR_COLLECTION ).find({"canLogin":"false"}).toArray()
            resolve(users )
        })
    },
    admitVendor :(vendorId)=>{
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.VENDOR_COLLECTION ).updateOne({_id:objectId(vendorId)},{$set:{"canLogin":true}}).then((response)=>{
                
                resolve(response)
            })
           
        }) 
},
vendorLogin : (vendorData)=>{
    return new Promise(async(resolve,reject)=>{
        let loginStatus = false
        let response = {}
        
        let user = await db.get().collection(collection.VENDOR_COLLECTION).findOne({email:vendorData.email,"canLogin":true})
        if(user){vendorData
            bcrypt.compare(vendorData.password,user.password).then((status)=>{

                console.log(vendorData.password);
                console.log(user.password);
                if (status){
                    console.log('login success');
                    response.user = user
                    response.status = true
                    resolve(response)

                }else {
                    console.log('login failed');
            //    resolve({status:false})
            // response.status = false;
            // response.passwordErr = true;
            resolve(response)

                }
                

            })
        }
    })
},
addProduct : (product,callback)=>{
    console.log(product);
 
    db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
       console.log(data);
        callback(data.insertedId)
    })
   
       }
}